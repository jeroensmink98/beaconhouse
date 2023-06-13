import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SiteProfile } from 'src/typeorm';
import { WorkspacesService } from 'src/workspaces/services/workspaces.service';
import { In, Repository } from 'typeorm';
import { CreateSiteProfilesDto } from '../dto/site-profiles-dtos';

@Injectable()
export class SiteProfilesService {
    constructor(
        @InjectRepository(SiteProfile)
        private siteProfileRepository: Repository<SiteProfile>,
        private readonly workspacesService: WorkspacesService,

    ) { }

    // Create
    async createSiteProfile(createSiteProfileDto: CreateSiteProfilesDto): Promise<SiteProfile> {
        const siteProfile = new SiteProfile();
        siteProfile.name = createSiteProfileDto.name;
        siteProfile.url = createSiteProfileDto.url;
        siteProfile.workspace = createSiteProfileDto.workspace;

        return this.siteProfileRepository.save(siteProfile);
    }

    // Read all
    async getSiteProfiles(workspaceId: string): Promise<SiteProfile[]> {
        return await this.siteProfileRepository
            .createQueryBuilder("siteProfile")
            .innerJoin("siteProfile.workspace", "workspace")
            .where("workspace.workspace_id = :workspaceId", { workspaceId })
            .getMany();
    }

    // Read one
    async getSiteProfileById(id: string): Promise<SiteProfile> {
        return await this.siteProfileRepository.findOneBy({ siteProfileId: id });
    }

    // Update
    async updateSiteProfile(id: string, updatedSiteProfile: Partial<SiteProfile>): Promise<SiteProfile> {
        await this.siteProfileRepository.update(id, updatedSiteProfile);
        return await this.siteProfileRepository.findOneBy({ siteProfileId: id });
    }

    // Delete
    async deleteSiteProfile(id: string): Promise<void> {
        await this.siteProfileRepository.delete(id);
    }
}
