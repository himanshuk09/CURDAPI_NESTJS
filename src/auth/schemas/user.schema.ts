import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
  TEACHER = 'teacher',
}
@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({
    enum: UserRoles,
    default: UserRoles.ADMIN,
  })
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
