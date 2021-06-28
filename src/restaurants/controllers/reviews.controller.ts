import { Controller, Post, Body, Request, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewService } from '../services/review.service';
import { ReplyCreateParamsDTO, ReviewCreateParamsDTO } from '../dto';

@Controller('reviews')
@ApiTags('Reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201 })
  async create(@Body() review: ReviewCreateParamsDTO, @Request() req) {
    await this.reviewService.create(review, req.user);
  }

  @Post(':id/reply')
  @ApiBearerAuth()
  @ApiResponse({ status: 201 })
  async reply(@Param() params, @Body() review: ReplyCreateParamsDTO) {
    await this.reviewService.createReply(params.id, review);
  }
}
