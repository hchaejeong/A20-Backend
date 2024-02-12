import { IsEmail, IsString } from "class-validator";

export class UserRegisterRequestDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}