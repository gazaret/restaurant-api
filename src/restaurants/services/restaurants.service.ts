import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { ReviewRepository } from '../repositories/review.repository';
import { RestaurantEntity } from '../entities/restaurant.entity';
import { RestaurantNotFoundException } from '../errors/restaurant-not-found.exeption';
import {
  RestaurantCreateParamsDto,
  RestaurantDetailResponseDto,
  RestaurantsListResponseDTO,
} from '../dto';
import { ReviewService } from './review.service';

@Injectable()
export class RestaurantsService {
  constructor(
    private restaurantRepository: RestaurantRepository,
    private reviewRepository: ReviewRepository,
    private reviewService: ReviewService,
  ) {}

  async getAll(): Promise<RestaurantsListResponseDTO[]> {
    const restaurantsEntities = await this.restaurantRepository.find();

    const restaurants = restaurantsEntities.map(async (entity) => {
      const reviews = await this.reviewRepository.getReviewsByRestaurantId(
        entity.id,
      );

      const averageRate = this.reviewService.getAverageRating(reviews);
      const unrepliedComments = this.reviewService.getUnrepliedComments(
        reviews,
      );

      return new RestaurantsListResponseDTO(
        entity.id,
        entity.name,
        entity.imageData,
        averageRate,
        unrepliedComments,
      );
    });

    return Promise.all([...restaurants]);
  }

  async getById(id: number): Promise<RestaurantDetailResponseDto> {
    const restaurant = await this.restaurantRepository.findOne(id);

    if (!restaurant) {
      throw new RestaurantNotFoundException();
    }

    const reviews = await this.reviewRepository.find({ restaurant });

    return new RestaurantDetailResponseDto(
      restaurant.id,
      restaurant.name,
      restaurant.imageData,
      reviews,
    );
  }

  async create(data: RestaurantCreateParamsDto): Promise<RestaurantEntity> {
    const isExist = await this.restaurantRepository.findAndCount({
      name: data.name,
    });

    if (isExist[1]) {
      throw new UnprocessableEntityException('This restaurant already exist');
    }

    const restaurant = new RestaurantEntity();
    restaurant.name = data.name;
    restaurant.description = data.description;
    restaurant.imageData = data.imageData;

    await this.restaurantRepository.save(restaurant);

    return restaurant;
  }

  async update(
    id: number,
    data: RestaurantCreateParamsDto,
  ): Promise<RestaurantEntity> {
    const restaurant = await this.restaurantRepository.findOne(id);

    if (!restaurant) {
      throw new RestaurantNotFoundException();
    }

    restaurant.name = data.name;
    restaurant.description = data.description;
    restaurant.imageData = data.imageData;

    await this.restaurantRepository.update(id, restaurant);

    return restaurant;
  }

  async delete(id: number): Promise<void> {
    const isExist = await this.restaurantRepository.findAndCount({ id });

    if (!isExist[1]) {
      throw new RestaurantNotFoundException();
    }

    await this.restaurantRepository.delete(id);
  }
}
