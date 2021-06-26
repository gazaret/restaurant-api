import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { RestaurantEntity } from '../entities/restaurant.entity';
import { RestaurantCreateParamsDto } from '../dto';
import { RestaurantNotFoundException } from '../errors/restaurant-not-found.exeption';

@Injectable()
export class RestaurantsService {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async getAll(): Promise<RestaurantEntity[]> {
    return this.restaurantRepository.find();
  }

  async getById(id: number): Promise<RestaurantEntity> {
    const restaurant = await this.restaurantRepository.findOne(id);

    if (!restaurant) {
      throw new RestaurantNotFoundException();
    }

    return restaurant;
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
