import { Module } from '@nestjs/common';
import { SitesController } from './controllers/sites/sites.controller';
import { SitesService } from './services/sites/sites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from 'src/typeorm';
import { DbValidatorsModule } from '@youba/nestjs-dbvalidator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Site]),

  ],
  controllers: [SitesController],
  providers: [SitesService]
})
export class SitesModule { }
