import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { User } from './model/user.model';

@Injectable()
export class AppService {
  constructor(private neo4jService: Neo4jService) {}

  async createUser(user: User) {
    const createPersonCypherQuery = `
        CREATE (p:Person {
          name: $name,
          surname: $surname,
          profession: $profession,
          username: $username,
          password: $password
        })
        MERGE (u:UniqueUsername {username: $username})
        MERGE (p)-[:HAS_UNIQUE_USERNAME]->(u)
      `;

    await this.neo4jService.getWriteSession();

    const result = await this.neo4jService.write(createPersonCypherQuery, user);

    console.log(result);

    return result;
  }
}
