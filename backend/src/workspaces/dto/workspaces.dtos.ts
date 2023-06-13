import { IsNotEmpty, MinLength } from "class-validator";

export class CreateWorkspaceDto {
    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @IsNotEmpty()
    @MinLength(2)
    organization: string;
}