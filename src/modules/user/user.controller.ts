import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserStoreValidation } from './validations/user.store.validation';
import { UserUpdateValidation } from './validations/user.update.validation';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  index() {
    return this.userService.findAll();
  }

  @Get()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  store(@Body() data: UserStoreValidation) {
    return this.userService.store(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UserUpdateValidation) {
    return this.userService.update(id, data);
  }

  @Delete()
  destroy(@Param('id') id: string) {
    return this.userService.destroy(id);
  }
}
