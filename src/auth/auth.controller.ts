import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Register a new user
  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<SignUpDto> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/login')
  login(@Body() loginDto: LoginDto): Promise<User> {
    return this.authService.login(loginDto);
  }
}
