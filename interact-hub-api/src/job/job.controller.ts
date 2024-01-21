import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobService } from './job.service';
import { Job } from './entities/job.entity';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post(':company')
  async create(
    @Body() createJobDto: Job,
    @Param('company') companyName: string,
  ) {
    return await this.jobService.create(createJobDto, companyName);
  }
  @Get('recommendation/:username')
  async getJobRecommendations(@Param('username') username: string) {
    return await this.jobService.getJobRecommendations(username);
  }

  @Post('/apply/:username/:jobId')
  async apply(
    @Param('username') username: string,
    @Param('jobId') jobId: string,
  ) {
    await this.jobService.apply(username, jobId);
  }

  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: Job) {
    return this.jobService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobService.remove(+id);
  }
}
