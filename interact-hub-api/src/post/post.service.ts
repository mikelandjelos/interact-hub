import { Injectable } from '@nestjs/common';
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
    }

    await this.neo4jService.write(
      `
      MATCH (person:Person {username: $username})
      MATCH (post:Post {id: $postId})
      MERGE (person)-[:LIKES]->(post)
      `,
      { username, postId },
    );

    return `User ${username} liked post ${postId}`;
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

    const postIdResult = await this.neo4jService.write(
      `
      CREATE (post:Post {
        id: $id,
        content: $content,
        createdAt: datetime(),
        username: $username
      })
      RETURN post.id as postId
      `,
      { id: newPostId, content: content, username: username },
    );

    const postId = postIdResult.records[0].get('postId');

    await this.neo4jService.write(
      `
      MATCH (person:Person { username: $username })
      MATCH (post:Post { id: $postId })
      CREATE (person)-[:CREATED]->(post)
      `,
      { username, postId, content },
    );

    return postId;
  }

  async countLikesOnPost(postId: number) {
    const likeCountResult = await this.neo4jService.read(
      `
      MATCH (:Person)-[:LIKES]->(post:Post { id: $postId })
      RETURN count(*) as likeCount
      `,
      { postId },
    );

    const likeCount = likeCountResult.records[0]?.get('likeCount');

    return likeCount || 0;
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
      MATCH (me:Person {username: $username})-[:FOLLOWS]->(followed:Person)
      MATCH (followed)-[:CREATED]->(createdPost:Post)
      OPTIONAL MATCH (followed)-[:LIKES]->(likedPost:Post)
      WHERE NOT (me)-[:LIKES]->(likedPost)
      RETURN DISTINCT createdPost, likedPost
      LIMIT 50
      `,
      { username },
    );

    const recommendedPosts = recommendationResult.records.flatMap((record) => {
      let array = [];
      const createdPost = record.get('createdPost');
      const likedPost = record.get('likedPost');

      if (createdPost) {
        array = array.concat(createdPost);
      }
      if (likedPost) {
        array = array.concat(likedPost);
      }

      return array.map((element) => element.properties);
    });

    return recommendedPosts;
  }
}
