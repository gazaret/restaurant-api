import { NotFoundException } from '@nestjs/common';

export class ReviewNotFoundException extends NotFoundException {
  constructor() {
    super('This review not found');
  }
}
