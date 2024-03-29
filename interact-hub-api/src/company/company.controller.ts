import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post(':username')
  async create(
    @Body() createCompanyDto: Company,
    @Param('username') username: string,
  ) {
    console.log(createCompanyDto);
    console.log(username);
    return await this.companyService.create(createCompanyDto, username);
  }

  @Get(':username')
  findAll(@Param('username') username: string) {
    return this.companyService.findAllForUsername(username);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: Company) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
