import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsController } from './controllers/restaurants.controller';
import { RestaurantsService } from './services/restaurants.service';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { RestaurantEntity } from './entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity, RestaurantRepository])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
