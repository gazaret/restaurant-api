import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RestaurantsController } from './controllers/restaurants.controller';
import { ReviewsController } from './controllers/reviews.controller';
import { RestaurantsService } from './services/restaurants.service';
import { ReviewService } from './services/review.service';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { ReviewRepository } from './repositories/review.repository';
import { RestaurantEntity } from './entities/restaurant.entity';
import { ReviewEntity } from './entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RestaurantEntity,
      RestaurantRepository,
      ReviewEntity,
      ReviewRepository,
    ]),
    ConfigModule,
  ],
  controllers: [RestaurantsController, ReviewsController],
  providers: [RestaurantsService, ReviewService],
})
export class RestaurantsModule {}
