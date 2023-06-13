import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SiteProfile } from "src/typeorm";
import { SiteProfilesService } from "./services/site-profiles.service";
import { SiteProfilesController } from "./controllers/site-profiles.controller";
import { WorkspacesModule } from "src/workspaces/workspaces.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([SiteProfile]),
        WorkspacesModule,
    ],
    controllers: [SiteProfilesController],
    providers: [SiteProfilesService],
    exports: [SiteProfilesService],
})
export class SiteProfilesModule { }