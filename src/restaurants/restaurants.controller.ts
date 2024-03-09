import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './schemas/restaurant.schema';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantsService.findAll();
  }

  @Post()
  async createRestaurants(
    @Body() restaurant: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantsService.create(restaurant);
  }

  @Get(':id')
  async getRestaurant(@Param('id') id: string): Promise<Restaurant> {
    return this.restaurantsService.findById(id);
  }

  @Put(':id')
  async UpdateRestaurant(
    @Param('id') id: string,
    @Body() restaurant: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    await this.restaurantsService.findById(id);
    return this.restaurantsService.updateById(id, restaurant);
  }

  @Delete(':id')
  async deleteRestaurant(
    @Param('id') id: string,
  ): Promise<{ deleted: boolean }> {
    await this.restaurantsService.findById(id);
    const deletedRestaurant = await this.restaurantsService.deleteById(id);
    if (deletedRestaurant) {
      return { deleted: true };
    } else {
      throw new NotFoundException('Restaurant not found');
    }
  }
}
