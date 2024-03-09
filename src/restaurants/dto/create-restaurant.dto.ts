import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/restaurant.schema';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsEmail({}, { message: 'Please enter valid email address' })
  @IsNotEmpty()
  readonly email: string;
  @IsNumber()
  @IsNotEmpty()
  readonly phoneNo: number;
  @IsString()
  @IsNotEmpty()
  readonly address: string;
  @IsEnum(Category, { message: 'Please enter correct category' })
  @IsNotEmpty()
  readonly category: Category;
}
