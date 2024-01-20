import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import { IPost } from './entities/post.entity';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class PostService {
  constructor(private neo4jService: Neo4jService) {}
  async likePost(username: string, postId: string) {
    const person = await this.findPersonByUsername(username);
    if (!person) {
      throw new Error('Person not found');
    }

    const post = await this.findPostById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    const alreadyLiked = await this.neo4jService.read(
      `
      MATCH (person:Person {username: $username})-[:LIKES]->(post:Post {id: $postId})
      RETURN person, post
      `,
      { username, postId },
    );

    if (alreadyLiked.records.length > 0) {
      throw new Error('Person already liked the post');
      return;
    }

    await this.neo4jService.write(
      `
      MATCH (person:Person {username: $username}), (post:Post {id: $postId})
      CREATE (person)-[:LIKES]->(post)
      `,
      { username, postId },
    );

    console.log(`User ${username} liked post ${postId}`);
  }
  private async findPostById(postId: string) {
    const result = await this.neo4jService.read(
      `
      MATCH (post:Post {id: $postId})
      RETURN post
      `,
      { postId },
    );

    return result.records[0]?.get('post');
  }
  async create(createPostDto: IPost, username: string) {
    const person = await this.findPersonByUsername(username);

    if (!person) {
      throw new Error('Person not found');
    }

    const content = createPostDto.content;
    const newPostId = uuidv4();
    const time = Date.now();

    const postIdResult = await this.neo4jService.write(
      `
      CREATE (post:Post {
        id: $id,
        content: $content,
        createdAt: datetime()
      })
      RETURN post.id as postId
      `,
      { id: newPostId, content },
    );

    const postId = postIdResult.records[0].get('postId');

    await this.neo4jService.write(
      `
      MATCH (person:Person {username: $username})
      CREATE (person)-[:CREATED]->(post:Post {id: $postId, content: $content, createdAt: datetime()})
      `,
      { username, postId, content },
    );

    return postId;
  }

  async countLikesOnPost(postId: number) {
    const likeCount = await this.neo4jService.read(
      `
      MATCH (:User)-[l:Likes]->(:Post { id: $postId })
      RETURN count(l)
      `,
      { postId },
    );

    return likeCount.records[0].get(0);
  }

  private async findPersonByUsername(username: string) {
    const result = await this.neo4jService.read(
      `
      MATCH (person:Person {username: $username})
      RETURN person
      `,
      { username },
    );

    return result.records[0]?.get('person');
  }
  async recommendationPost(username: string) {
    const recommendationResult = await this.neo4jService.read(
      `
      MATCH (follower:Person {username: $username})-[:FOLLOWS]->(following:Person)-[:CREATED]->(post:Post)
      WHERE NOT (follower)-[:LIKES]->(post)
      RETURN DISTINCT post
      `,
      { username },
    );

    const recommendedPosts = recommendationResult.records.map((record) =>
      record.get('post'),
    );

    return recommendedPosts;
  }
}
