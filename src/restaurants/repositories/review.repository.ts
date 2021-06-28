import { Repository, EntityRepository } from 'typeorm';
import { ReviewEntity } from '../entities/review.entity';

@EntityRepository(ReviewEntity)
export class ReviewRepository extends Repository<ReviewEntity> {
  async getReviewsByRestaurantId(id: number): Promise<ReviewEntity[]> {
    const reviewWithRestaurants = await this.find({
      relations: ['restaurant'],
    });

    return reviewWithRestaurants.filter(
      (entity) => entity.restaurant.id === id,
    );
  }
}
