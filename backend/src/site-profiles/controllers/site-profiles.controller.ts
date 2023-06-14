import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { SiteProfilesService } from '../services/site-profiles.service';
import { CreateSiteProfilesDto } from '../dto/site-profiles-dtos';
import { WorkspacesService } from 'src/workspaces/services/workspaces.service';
import { log } from 'console';

@Controller('workspaces/:workspaceId/site-profiles')
export class SiteProfilesController {
    constructor(
        private readonly siteProfilesService: SiteProfilesService,
        private readonly workspacesService: WorkspacesService,
    ) { }

    // Create
    @Post()
    @UsePipes(ValidationPipe)
    async createSiteProfile(
        @Param('workspaceId') workspaceId: string,
        @Body() createSiteProfileDto: CreateSiteProfilesDto,
    ) {
        // Check if workspace exists
        const workspace = await this.workspacesService.getWorkspaceById(workspaceId);
        if (!workspace) {
            throw new NotFoundException(`Workspace with ID ${workspaceId} not found`);
        }
        return await this.siteProfilesService.createSiteProfile(createSiteProfileDto, workspaceId);
    }

    @Get()
    async getSiteProfiles(@Param('workspaceId') workspaceId: string) {
        return await this.siteProfilesService.getSiteProfiles(workspaceId);
    }

    @Get(':siteProfileId')
    async getSiteProfileById(@Param('siteProfileId') siteProfileId: string) {
        return await this.siteProfilesService.getSiteProfileById(siteProfileId);
    }

    @Put(':siteProfileId')
    async updateSiteProfile(
        @Param('siteProfileId') siteProfileId: string,
        @Body() updatedSiteProfile: CreateSiteProfilesDto, // assuming you're using the same DTO for updates
    ) {
        return await this.siteProfilesService.updateSiteProfile(siteProfileId, updatedSiteProfile);
    }

    @Delete(':siteProfileId')
    async deleteSiteProfile(@Param('siteProfileId') siteProfileId: string) {
        return await this.siteProfilesService.deleteSiteProfile(siteProfileId);
    }
}
