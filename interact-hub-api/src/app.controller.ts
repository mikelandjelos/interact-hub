import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './model/user.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createUser(@Body() user: User) {
    return await this.appService.createUser(user);
  }
}
