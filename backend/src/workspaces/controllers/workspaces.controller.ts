import { Controller, Get, Param } from "@nestjs/common";
import { WorkspacesService } from "../services/workspaces.service";

@Controller('workspaces')
export class WorkspacesController {
    constructor(
        private readonly workspacesService: WorkspacesService,
    ) {

    }

    @Get()
    async getWorkspaces() {
        return await this.workspacesService.getWorkspaces();
    }

    @Get('id/:id')
    async getWorkspaceById(@Param('id') id: string) {
        return await this.workspacesService.getWorkspaceById(id);
    }
}