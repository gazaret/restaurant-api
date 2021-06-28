import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { RestaurantsService } from '../services/restaurants.service';
import { RestaurantEntity } from '../entities/restaurant.entity';
import {
  RestaurantCreateParamsDto,
  RestaurantDetailResponseDto,
  RestaurantsListResponseDTO,
} from '../dto';

@Controller('restaurants')
@ApiTags('Restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ type: RestaurantsListResponseDTO, isArray: true, status: 200 })
  getRestaurants() {
    return this.restaurantsService.getAll();
  }

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ type: RestaurantEntity, status: 201 })
  createRestaurant(@Body() data: RestaurantCreateParamsDto) {
    return this.restaurantsService.create(data);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ type: RestaurantDetailResponseDto, status: 200 })
  getRestaurant(@Param() params) {
    return this.restaurantsService.getById(params.id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiResponse({ type: RestaurantEntity, status: 200 })
  updateRestaurant(@Param() params, @Body() data: RestaurantCreateParamsDto) {
    return this.restaurantsService.update(params.id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  deleteRestaurant(@Param() params) {
    return this.restaurantsService.delete(params.id);
  }
}
