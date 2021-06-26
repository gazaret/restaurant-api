import { Repository, EntityRepository } from 'typeorm';
import { RestaurantEntity } from '../entities/restaurant.entity';

@EntityRepository(RestaurantEntity)
export class RestaurantRepository extends Repository<RestaurantEntity> {}
