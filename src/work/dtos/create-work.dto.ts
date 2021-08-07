import { IsMongoId, IsString } from 'class-validator';

export class CreateWorkDTO {
  @IsString()
  src: string;

  @IsString()
  title: string;

  @IsString()
  link: string;

  @IsString()
  category: string;

  @IsString()
  @IsMongoId()
  gitUser: string;
}
