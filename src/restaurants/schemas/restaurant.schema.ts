import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  FAST_FOOD = 'Fast Food',
  FINE_DINNING = 'Fine Dinning',
  CAFE = 'Cafe',
}

@Schema()
export class Restaurant {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  email: string;

  @Prop()
  phoneNo: number;

  @Prop()
  address: string;

  @Prop()
  category: Category;

  @Prop()
  images?: object[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
