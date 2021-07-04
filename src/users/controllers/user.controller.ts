import { Controller, Delete, Get, Put, Param, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserPublicDTO, UserUpdateParamsDTO } from '../dto';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ type: UserPublicDTO, isArray: true, status: 200 })
  async getUsers() {
    return this.userService.getAllExceptAdmins();
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiResponse({ type: UserPublicDTO, status: 200 })
  async update(@Param() params, @Body() userUpdateData: UserUpdateParamsDTO) {
    return this.userService.update(params.id, userUpdateData);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  async deleteUser(@Param() params) {
    return this.userService.delete(params.id);
  }
}
