import { IsNotEmpty, IsUrl, MinLength } from "class-validator";


export class CreateSiteDto {
    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @IsNotEmpty()
    @MinLength(6)
    @IsUrl({ require_protocol: true }, { message: "url must be a valid url and contain protocol" })
    url: string;
}