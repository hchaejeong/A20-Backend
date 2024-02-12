import { IsEmail, IsString } from "class-validator";

export class EnterCarRequestDto {
    @IsString()
    id: string

    @IsString()
    carType: string

    @IsString()
    carNumber: string
}