import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Request,
  Res,
  UseInterceptors,
  UploadedFile,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Public } from '../../auth/decorators/public.decorator';
import { RestaurantsService } from '../services/restaurants.service';
import {
  RestaurantCreateParamsDto,
  RestaurantCreateResponseDTO,
  RestaurantDetailResponseDto,
  RestaurantsListResponseDTO,
  UploadPhotoResponseDTO,
} from '../dto';
import { multerOptions } from '../utils/multer';

@Controller('restaurants')
@ApiTags('Restaurants')
export class RestaurantsController {
  constructor(
    private restaurantsService: RestaurantsService,
    private configService: ConfigService,
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ type: RestaurantsListResponseDTO, isArray: true, status: 200 })
  getRestaurants(@Request() req) {
    return this.restaurantsService.getAll(req.user);
  }

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ type: RestaurantCreateResponseDTO, status: 201 })
  createRestaurant(@Body() data: RestaurantCreateParamsDto, @Request() req) {
    return this.restaurantsService.create(data, req.user);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ type: RestaurantDetailResponseDto, status: 200 })
  getRestaurant(@Param() params, @Request() req) {
    return this.restaurantsService.getById(params.id, req.user);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiResponse({ type: RestaurantCreateResponseDTO, status: 200 })
  updateRestaurant(
    @Param() params,
    @Request() req,
    @Body() data: RestaurantCreateParamsDto,
  ) {
    return this.restaurantsService.update(params.id, req.user, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  deleteRestaurant(@Param() params, @Request() req) {
    return this.restaurantsService.delete(params.id, req.user);
  }

  @Post(':id/photo')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiBearerAuth()
  @ApiResponse({ type: UploadPhotoResponseDTO, status: 201 })
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param() params,
    @Request() req,
  ) {
    if (!file) {
      throw new UnprocessableEntityException('File is missing');
    }

    const appPort = this.configService.get<string>('PORT');
    const devHost = `http://localhost:${appPort}`;
    const prodHost = `https://${req.hostname}`;

    const baseUrl =
      this.configService.get<string>('NODE_ENV') === 'production'
        ? prodHost
        : devHost;
    const fileUrl = `${baseUrl}/restaurants/${params.id}/photo/${file.filename}`;

    await this.restaurantsService.updatePhoto(params.id, fileUrl);

    return new UploadPhotoResponseDTO(fileUrl);
  }

  @Get(':id/photo/:idPhoto')
  @Public()
  @ApiResponse({ status: 200 })
  async getPhoto(@Param() params, @Res() res) {
    res.sendFile(params.idPhoto, { root: 'photos' });
  }
}
