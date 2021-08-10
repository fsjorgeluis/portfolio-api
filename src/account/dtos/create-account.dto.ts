import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAccountDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  gitUser: string;
}
