import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Neo4jService } from 'nest-neo4j/dist';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private neo4jService: Neo4jService) {}

  async create(user: User) {
    const username = user.username;
    const profession = user.profession;
    const surname = user.surname;
    const password = user.password;
    const name = user.name;

    const existingPerson = await this.neo4jService.read(
      `MATCH (p:Person {username: $username}) RETURN p`,
      { username },
    );

    if (existingPerson.records.length > 0) {
      throw new Error('Username already exists');
    }

    const newPersonId = uuidv4();
    const createdPerson = await this.neo4jService.write(
      `
      CREATE (p:Person {
        id: $id,
        name: $name,
        surname: $surname,
        username: $username,
        profession: $profession,
        password: $password
      })
      RETURN p
      `,
      { id: newPersonId, name, surname, username, profession, password },
    );

    return createdPerson.records[0].get('p').properties as User;
  }
  async followPerson(followerUsername: string, followingUsername: string): Promise<void> {
   
    const [followerPerson, followingPerson] = await Promise.all([
      this.findPersonByUsername(followerUsername),
      this.findPersonByUsername(followingUsername),
    ]);

    if (!followerPerson || !followingPerson) {
      throw new Error('One or both users not found');
    }

    
    const existingRelationship = await this.neo4jService.read(
      `
      MATCH (follower:Person {username: $followerUsername})-[r:FOLLOWS]->(following:Person {username: $followingUsername})
      RETURN r
      `,
      { followerUsername, followingUsername }
    );

    if (existingRelationship.records.length > 0) {
      throw new Error('Already following');
    }

    
    await this.neo4jService.write(
      `
      MATCH (follower:Person {username: $followerUsername}), (following:Person {username: $followingUsername})
      CREATE (follower)-[:FOLLOWS]->(following)
      `,
      { followerUsername, followingUsername }
    );
  }

  private async findPersonByUsername(username: string): Promise<any> {
    const result = await this.neo4jService.read(
      `
      MATCH (p:Person {username: $username})
      RETURN p
      `,
      { username }
    );

    if (result.records.length > 0) {
      return result.records[0].get('p').properties;
    }

    return null;
  }
  async getFollowersOfFollowedPersons(username: string) {
    
    const followedPersons = await this.neo4jService.read(
      `
      MATCH (:Person {username: $username})-[:FOLLOWS]->(:Person)-[:FOLLOWS]->(follower_of_following:Person)
      WHERE NOT (:Person {username: $username})-[:FOLLOWS]->(follower_of_following)
      AND NOT follower_of_following.username = $username
      RETURN DISTINCT follower_of_following
      LIMIT 10;
      `,
      { username }
    );

   
    return followedPersons.records.map((record) => record.get('follower_of_following').properties);
  }
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: Partial<User>) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}