import { ApiProperty } from '@nestjs/swagger';

export class UploadPhotoResponseDTO {
  @ApiProperty({
    type: 'string',
    name: 'photoUrl',
  })
  photoUrl: string;

  constructor(photoUrl: string) {
    this.photoUrl = photoUrl;
  }
}
