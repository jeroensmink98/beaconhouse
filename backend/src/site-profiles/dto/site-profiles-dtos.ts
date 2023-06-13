import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Workspace } from "src/typeorm";

export class CreateSiteProfilesDto {
    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @IsNotEmpty()
    @MinLength(2)
    url: string;

    workspace: Workspace;
}