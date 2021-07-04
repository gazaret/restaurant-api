import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserEntity } from '../../users/entities/user.entity';
import { Roles } from '../../auth/constants';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { ReviewRepository } from '../repositories/review.repository';
import { RestaurantEntity } from '../entities/restaurant.entity';
import { RestaurantNotFoundException } from '../errors/restaurant-not-found.exeption';
import {
  RestaurantCreateParamsDto,
  RestaurantCreateResponseDTO,
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

  async getAll(user: UserEntity): Promise<RestaurantsListResponseDTO[]> {
    const userIsOwner = user.role === Roles.OWNER;

    const restaurantsEntities = await this.restaurantRepository.find();

    const restaurants = restaurantsEntities
      .filter((restaurant) => {
        if (userIsOwner) {
          return restaurant.user.id === user.id;
        }

        return true;
      })
      .map(async (entity) => {
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
          entity.description,
          entity.imageData,
          averageRate,
          unrepliedComments,
        );
      });

    return Promise.all([...restaurants]);
  }

  async getById(
    id: number,
    user: UserEntity,
  ): Promise<RestaurantDetailResponseDto> {
    const restaurant = await this.restaurantRepository.findOne(id);

    const userIsOwner = user.role === Roles.OWNER;
    const isUserRestaurant = restaurant?.user?.id === user.id;

    if (!restaurant || (userIsOwner && !isUserRestaurant)) {
      throw new RestaurantNotFoundException();
    }

    const reviews = await this.reviewRepository.find({ restaurant });

    const averageRate = this.reviewService.getAverageRating(reviews);
    const unrepliedComments = this.reviewService.getUnrepliedComments(reviews);

    return new RestaurantDetailResponseDto(
      restaurant.id,
      restaurant.name,
      restaurant.imageData,
      reviews,
      averageRate,
      unrepliedComments,
    );
  }

  async create(
    data: RestaurantCreateParamsDto,
    user: UserEntity,
  ): Promise<RestaurantCreateResponseDTO> {
    const isExist = await this.restaurantRepository.findAndCount({
      name: data.name,
    });

    if (isExist[1]) {
      throw new UnprocessableEntityException('This restaurant already exist');
    }

    const restaurant = new RestaurantEntity();
    restaurant.name = data.name;
    restaurant.description = data.description;
    restaurant.user = user;

    await this.restaurantRepository.save(restaurant);

    return new RestaurantCreateResponseDTO(
      restaurant.id,
      restaurant.name,
      restaurant.description,
      restaurant.imageData,
    );
  }

  async update(
    id: number,
    user: UserEntity,
    data: RestaurantCreateParamsDto,
  ): Promise<RestaurantCreateResponseDTO> {
    const restaurant = await this.restaurantRepository.findOne(id);

    const userIsOwner = user.role === Roles.OWNER;
    const isUserRestaurant = restaurant?.user?.id === user.id;

    if (!restaurant || (userIsOwner && !isUserRestaurant)) {
      throw new RestaurantNotFoundException();
    }

    restaurant.name = data.name;
    restaurant.description = data.description;

    await this.restaurantRepository.update(id, restaurant);

    return new RestaurantCreateResponseDTO(
      restaurant.id,
      restaurant.name,
      restaurant.description,
      restaurant.imageData,
    );
  }

  async delete(id: number, user: UserEntity): Promise<void> {
    const restaurant = await this.restaurantRepository.findOne({ id });

    const userIsOwner = user.role === Roles.OWNER;
    const isUserRestaurant = restaurant?.user?.id === user.id;

    if (!restaurant || (userIsOwner && !isUserRestaurant)) {
      throw new RestaurantNotFoundException();
    }

    await this.restaurantRepository.delete(id);
  }

  async updatePhoto(id: number, fileUrl: string): Promise<void> {
    const restaurant = await this.restaurantRepository.findOne(id);

    if (!restaurant) {
      throw new RestaurantNotFoundException();
    }

    restaurant.imageData = fileUrl;

    await this.restaurantRepository.update({ id }, restaurant);
  }
}
