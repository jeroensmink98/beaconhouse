import { Module, forwardRef } from '@nestjs/common';
import { WorkspacesController } from "./controllers/workspaces.controller";
import { Workspace } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspacesService } from './services/workspaces.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Workspace]),
        forwardRef(() => UsersModule),
    ],
    controllers: [WorkspacesController],
    providers: [WorkspacesService],
    exports: [WorkspacesService],
})
export class WorkspacesModule { }