import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DockerService } from './docker/docker.service';
import { DockerController } from './docker/docker.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';
import { DbValidatorsModule } from '@youba/nestjs-dbvalidator';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { SiteProfilesController } from './site-profiles/controllers/site-profiles.controller';
import { SiteProfilesService } from './site-profiles/services/site-profiles.service';
import { SiteProfilesModule } from './site-profiles/site-profiles.module';
import { UsersService } from './users/services/users.service';
import { UsersController } from './users/controllers/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';



@Module({
  controllers: [AppController, DockerController],
  providers: [AppService, DockerService],
  imports: [
    WorkspacesModule,
    SiteProfilesModule,
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
        // migrate all entities in the entities array
        entities: entities,
        // @TODO: Turn this off in production
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule { }
