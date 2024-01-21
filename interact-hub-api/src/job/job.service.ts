import { Injectable } from '@nestjs/common';
import { Job } from './entities/job.entity';
import { Neo4jService } from 'nest-neo4j/dist';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JobService {
  constructor(private neo4jService: Neo4jService) {}

  async create(createJobDto: Job, companyName: string) {
    const createdJob = (
      await this.neo4jService.write(
        `
      CREATE (j:Job {
        id: $id,
        position: $position,
        description: $description,
        companyName: $companyName
      })
      RETURN j
      `,
        { id: uuidv4(), ...createJobDto,companyName },
      )
    ).records[0].get('j').properties as Job;

    await this.neo4jService.write(
      `
      MATCH (c:Company { name: $companyName })
      MATCH (j:Job { id: $jobId })
      CREATE (c)-[o:OFFERS]->(j)
      return o
      `,
      { companyName: companyName, jobId: createdJob.id },
    );

    return createdJob;
  }
  async getJobRecommendations(username: string) {
    const recommendedJobs = (
      await this.neo4jService.read(
        `
      MATCH (me:Person { username: $username })-[:APPLIES]->(:Job)<-[:OFFERS]-(:Company)-[:OFFERS]->(otherJob:Job)
      WHERE NOT EXISTS((me)-[:APPLIES]->(otherJob))
      RETURN DISTINCT otherJob as job
      UNION
      MATCH (me:Person { username: $username })-[:FOLLOWS]->(:Person)-[:REGISTERS]->(:Company)-[:OFFERS]->(followedJob:Job)
      WHERE NOT EXISTS((me)-[:APPLIES]->(followedJob))
      RETURN DISTINCT followedJob as job
      `,
        { username },
      )
    ).records.map((record) => record.get('job')?.properties);

    if (recommendedJobs.length == 0) {
      return (
        await this.neo4jService.read(
          `
        MATCH (job:Job)
        RETURN job as jobs
        LIMIT 50;
        `,
        )
      ).records.map((record) => {
        return record.get('jobs')?.properties;
      });
    }

    return recommendedJobs;
  }


  async apply(username: string, jobId: string) {
    return (
      await this.neo4jService.write(
        `
      MATCH (person:Person { username: $username })
      MATCH (job:Job { id: $jobId })
      MERGE (person)-[application:APPLIES]->(job)
      RETURN application
      `,
        { username, jobId },
      )
    ).records.map((record) => record.get('application')?.properties);
  }

  findAll() {
    return `This action returns all job`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: Partial<Job>) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
