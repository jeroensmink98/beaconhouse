import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DockerService } from './docker/docker.service';
import { DockerController } from './docker/docker.controller';
import { SitesModule } from './sites/sites.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';


@Module({
  controllers: [AppController, DockerController],
  providers: [AppService, DockerService],
  imports: [
    SitesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        // @TODO: Turn this off in production
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule { }
