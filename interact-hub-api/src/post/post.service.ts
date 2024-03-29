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

    return {postId};
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

  async getPostsCreatedAndLikedByUser(username: string) {
    return (
      await this.neo4jService.read(
        `
        MATCH (p:Person { username: $username })-[:CREATED]->(createdPosts:Post)
        RETURN DISTINCT createdPosts as posts
        UNION
        MATCH (p:Person { username: $username })-[:LIKES]->(likedPosts:Post)
        RETURN DISTINCT likedPosts as posts
      `,
        { username },
      )
    ).records.map((record) => record.get('posts')?.properties);
  }

  async recommendationPost(username: string) {
    const recommendationResult = await this.neo4jService.read(
      `
      MATCH (me:Person { username: $username })-[:FOLLOWS]->(followed:Person)
      MATCH (followed)-[:CREATED]->(createdPost:Post)
      WHERE NOT EXISTS((me)-[:LIKES]->(createdPost))
      RETURN DISTINCT createdPost as post
      LIMIT 25
      UNION
      MATCH (me:Person { username: $username })-[:FOLLOWS]->(followed:Person)
      MATCH (followed)-[:LIKES]->(likedPosts:Post)
      WHERE NOT EXISTS((me)-[:LIKES]->(likedPosts))
      RETURN DISTINCT likedPosts as post
      LIMIT 25
      `,
      { username },
    );

    const recommendedPosts = recommendationResult.records.map(
      (record) => record.get('post')?.properties,
    );

    console.log(recommendedPosts);

    if (recommendedPosts.length == 0) {
      return (
        await this.neo4jService.read(
          `
        MATCH (post:Post)
        RETURN post as posts
        LIMIT 50;
        `,
        )
      ).records.map((record) => {
        return record.get('posts')?.properties;
      });
    }

    return recommendedPosts;
  }
}
