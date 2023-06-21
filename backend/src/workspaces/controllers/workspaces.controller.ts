import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { WorkspacesService } from "../services/workspaces.service";
import { CreateWorkspaceDto } from "../dto/workspaces.dtos";
import { UsersService } from "src/users/services/users.service";
import { Public } from "src/auth/auth.guard";

@Controller('workspaces')
export class WorkspacesController {
    constructor(
        private readonly workspacesService: WorkspacesService,
        private readonly usersService: UsersService,
    ) {

    }
    @Public()
    @Get()
    async getWorkspaces() {
        return await this.workspacesService.getWorkspaces();
    }

    @Get(':workspaceId/users')
    async getUsersByWorkspaceId(@Param('workspaceId') id: string) {
        return await this.usersService.getUserByWorkspaceId(id);
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