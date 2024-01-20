import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: User) {
    return await this.userService.create(user);
  }
  @Post('/follow/:username1/:username2')
  async followUser(
    @Param('username1') username1: string,
    @Param('username2') username2: string,
  ) {
    return await this.userService.followPerson(username1, username2);
  }

  @Get('/recommendation/:username')
  async findAll(@Param('username') username: string) {
    return await this.userService.getFollowersOfFollowedPersons(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Partial<User>) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
