import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ConfigEnvironment } from './types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService<ConfigEnvironment> = app.get(
    ConfigService,
  );
  const appPort = configService.get<number>('PORT');

  const config = new DocumentBuilder()
    .setTitle('Restaurant API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(appPort);
}
bootstrap();
