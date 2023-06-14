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
    async createSiteProfile(createSiteProfileDto: CreateSiteProfilesDto, workspaceId: string): Promise<SiteProfile> {
        const siteProfile = new SiteProfile();
        siteProfile.name = createSiteProfileDto.name;
        siteProfile.url = createSiteProfileDto.url;

        const workspace = await this.workspacesService.getWorkspaceById(workspaceId);
        if (!workspace) {
            throw new NotFoundException(`Workspace with ID ${workspaceId} not found`);
        }
        siteProfile.workspace = workspace;

        return this.siteProfileRepository.save(siteProfile);
    }

    // Read all

    async getSiteProfiles(workspaceId: string): Promise<SiteProfile[]> {
        console.log('workspaceId', workspaceId);
        return await this.siteProfileRepository
            .createQueryBuilder('siteProfile')
            .innerJoinAndSelect('siteProfile.workspace', 'workspace', 'workspace.workspaceId = :workspaceId', { workspaceId })
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
