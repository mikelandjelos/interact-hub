import { Neo4jService } from 'nest-neo4j/dist';
import { Injectable } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CompanyService {
  constructor(private neo4jService: Neo4jService) {}

  async create(createCompanyDto: Company, username: string) {
    const existingCompany = await this.neo4jService.read(
      `MATCH (c:Company {name: $name, email: $email}) RETURN c`,
      { name: createCompanyDto.name, email: createCompanyDto.email },
    );

    if (existingCompany.records.length > 0) {
      throw new Error('Company name already exists');
    }

    const companyId = uuidv4();

    const createCompanyQueryResult = await this.neo4jService.write(
      `
      CREATE (c:Company {
        id: $id,
        name: $name,
        email: $email,
        phone: $phone,
        password: $password
      })
      RETURN c
      `,
      { id: companyId, ...createCompanyDto },
    );

    const createdCompany = createCompanyQueryResult.records[0].get('c')
      .properties as Company;

    await this.neo4jService.write(
      `
      MATCH (person:Person { username: $username })
      MATCH (company:Company { id: $companyId })
      MERGE (person)-[:REGISTERS]->(company)
      `,
      { username, companyId },
    );

    return createdCompany;
  }

  async findAllForUsername(username: string) {
    return (
      await this.neo4jService.write(
        `
      MATCH (:Person { username: $username })-[:REGISTERS]->(company:Company)
      RETURN company
      `,
        { username },
      )
    ).records.map((record) => record.get('company')?.properties);
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: Company) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
