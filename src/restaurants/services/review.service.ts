import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../users/entities/user.entity';
import { RestaurantNotFoundException } from '../errors/restaurant-not-found.exeption';
import { ReviewNotFoundException } from '../errors/review-not-found.exeption';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { ReviewRepository } from '../repositories/review.repository';
import { ReviewEntity } from '../entities/review.entity';
import { ReplyCreateParamsDTO, ReviewCreateParamsDTO } from '../dto';

@Injectable()
export class ReviewService {
  constructor(
    private reviewRepository: ReviewRepository,
    private restaurantRepository: RestaurantRepository,
  ) {}

  async create(data: ReviewCreateParamsDTO, user: UserEntity) {
    const restaurant = await this.restaurantRepository.findOne(
      data.restaurantId,
    );

    if (!restaurant) {
      throw new RestaurantNotFoundException();
    }

    const review = new ReviewEntity();

    review.comment = data.comment;
    review.rate = data.rate;
    review.dateOfVisit = data.dateOfVisit;
    review.restaurant = restaurant;
    review.user = user;

    await this.reviewRepository.save(review);

    return review;
  }

  async createReply(id: number, replyDTO: ReplyCreateParamsDTO) {
    const reviewEntity = await this.reviewRepository.findOne(id);

    if (!reviewEntity) {
      throw new ReviewNotFoundException();
    }

    reviewEntity.reply = replyDTO.reply;

    await this.reviewRepository.update({ id }, reviewEntity);
  }

  getUnrepliedComments(reviews: ReviewEntity[]): number {
    return reviews.reduce((acc, curr) => {
      if (!curr.reply) {
        acc = acc + 1;
      }

      return acc;
    }, 0);
  }

  getAverageRating(reviews: ReviewEntity[]): number {
    const sumOfRating = reviews.reduce((acc, curr) => {
      return acc + curr.rate;
    }, 0);

    return sumOfRating / reviews.length;
  }
}
