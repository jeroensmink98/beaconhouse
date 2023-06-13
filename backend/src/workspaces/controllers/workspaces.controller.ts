import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { WorkspacesService } from "../services/workspaces.service";
import { CreateWorkspaceDto } from "../dto/workspaces.dtos";
import { log } from "console";

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

    @Get(':workspaceId')
    async getWorkspaceById(@Param('workspaceId') id: string) {
        return await this.workspacesService.getWorkspaceById(id);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    async createWorkspace(@Body() createWorkspaceDto: CreateWorkspaceDto) {
        return await this.workspacesService.createWorkspace(createWorkspaceDto);
    }


}