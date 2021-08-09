import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProfileDTO {
  @IsString()
  @IsOptional()
  photo?: string; //img url

  @IsString()
  @IsOptional()
  avatar?: string; //img url

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  gitUser: string;

  @IsString()
  @IsOptional()
  greet?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  cv?: string; //cv url

  @IsBoolean()
  @IsOptional()
  fromGit?: boolean;

  @IsNumber()
  @IsOptional()
  gitPublicRepos?: number;

  @IsNumber()
  @IsOptional()
  gitFollowers?: number;

  @IsNumber()
  @IsOptional()
  gitFollowing?: number;
}
