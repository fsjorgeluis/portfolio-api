import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProfileDTO {
  @IsString()
  photo: string; //img url

  @IsString()
  avatar: string; //img url

  @IsString()
  fullName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  gitUser: string;

  @IsString()
  greet: string;

  @IsString()
  bio: string;

  @IsString()
  cv: string; //cv url

  @IsBoolean()
  @IsOptional()
  fromGit?: boolean;
}
