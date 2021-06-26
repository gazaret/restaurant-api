import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ConfigEnvironment } from './types';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigEnvironment>) => {
        return {
          type: 'postgres',
          host: configService.get<string>('QOVERY_DATABASE_MY_DB_HOST'),
          port: configService.get<number>('QOVERY_DATABASE_MY_DB_PORT'),
          username: configService.get<string>('QOVERY_DATABASE_MY_DB_USERNAME'),
          password: configService.get<string>('QOVERY_DATABASE_MY_DB_PASSWORD'),
          database: configService.get<string>('QOVERY_DATABASE_MY_DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: configService.get<string>('NODE_ENV') !== 'production',
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    RestaurantsModule,
  ],
})
export class AppModule {}
