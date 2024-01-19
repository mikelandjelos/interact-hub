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
