import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { signInDto } from './dto/signin.dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: "login" })
  @Post('login')
  signIn(@Body() signInDto: signInDto): Promise<{ access_token: string }> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

}
