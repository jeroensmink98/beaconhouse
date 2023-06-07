import { Module } from '@nestjs/common';
import { WorkspacesController } from "./controllers/workspaces.controller";
import { Workspace } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspacesService } from './services/workspaces.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Workspace]),
    ],
    controllers: [WorkspacesController],
    providers: [WorkspacesService],
})
export class WorkspacesModule { }