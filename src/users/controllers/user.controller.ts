import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserPublicDTO } from '../dto/user-public.dto';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ type: UserPublicDTO, isArray: true, status: 200 })
  async getUsers() {
    return this.userService.getAll();
  }
}
