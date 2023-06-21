import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @IsEmail()
    userEmail: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    userPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    workspaceId: string;
}

export class SignInUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    userEmail: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    userPassword: string;
}

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @IsEmail()
    userEmail: string;


    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    userPassword: string;
}