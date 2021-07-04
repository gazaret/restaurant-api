import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { Public } from '../decorators/public.decorator';
import {
  SigninParamsDto,
  SignupParamsDto,
  SigninResponseDto,
  SignupResponseDto,
} from '../dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(200)
  @ApiResponse({ type: SigninResponseDto, status: 200 })
  async signin(@Body() signinData: SigninParamsDto, @Request() req) {
    return this.authService.signin(req.user);
  }

  @Public()
  @Post('signup')
  @ApiResponse({ type: SignupResponseDto, status: 201 })
  async signup(@Body() signupData: SignupParamsDto) {
    return this.authService.signup(signupData);
  }
}
