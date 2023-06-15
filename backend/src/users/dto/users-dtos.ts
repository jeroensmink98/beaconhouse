import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
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