import { NotFoundException } from '@nestjs/common';

export class RestaurantNotFoundException extends NotFoundException {
  constructor() {
    super('This restaurant not found');
  }
}
