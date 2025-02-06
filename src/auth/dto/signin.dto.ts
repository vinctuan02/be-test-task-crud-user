import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class signInDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 100)
    password: string;
}