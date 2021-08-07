import { IsMongoId, IsString } from 'class-validator';

export class CreateNetworkDTO {
  @IsString()
  src: string; //img url

  @IsString()
  title: string; //img url

  @IsString()
  link: string;

  @IsString()
  @IsMongoId()
  gitUser: string;
}
