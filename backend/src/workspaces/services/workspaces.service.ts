import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateWorkspaceDto } from "../dto/workspaces.dtos";
import { Workspace } from "src/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class WorkspacesService {
    constructor(
        @InjectRepository(Workspace) private readonly workspaceRepository: Repository<Workspace>,
    ) { }

    createWorkspace(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
        return this.workspaceRepository.save(createWorkspaceDto);
    }

    getWorkspaces(): Promise<Workspace[]> {
        return this.workspaceRepository.find();
    }

    getWorkspaceById(id: string): Promise<Workspace> {
        return this.workspaceRepository.findOneBy({ workspaceId: id });
    }
}