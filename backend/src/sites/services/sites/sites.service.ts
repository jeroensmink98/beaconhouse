import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSiteDto } from 'src/sites/dto/sites.dtos';
import { Site } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SitesService {
    constructor(
        @InjectRepository(Site) private readonly siteRepository: Repository<Site>,
    ) { }

    createSite(createSiteDto: CreateSiteDto): Promise<Site> {
        const newSite = this.siteRepository.create(createSiteDto);
        return this.siteRepository.save(newSite);
    }

    getAllSites(): Promise<Site[]> {
        return this.siteRepository.find();
    }

    findSiteById(id: string): Promise<Site> {
        return this.siteRepository.findOneBy({ "siteId": id });
    }
}
