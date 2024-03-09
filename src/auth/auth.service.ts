import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  // Register User
  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { name, email, password, role } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      return user;
    } catch (error) {
      //handle duplicate email
      if (error.code === 11000) {
        throw new ConflictException('Duplicate email entered');
      }
    }
  }
  //login user
  async login(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).select('password');

    if (!user) {
      throw new UnauthorizedException('Invalid email address or password');
    }
    //check if password match or not
    const isPasswordMatch = await bcrypt.compare(password, user.password); //first password is for body and second is from db
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email address or password');
    }
    return user;
  }
}
