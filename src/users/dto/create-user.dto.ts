import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @Length(3, 50)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(10)
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;
}
