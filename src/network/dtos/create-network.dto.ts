import { IsMongoId, IsString } from 'class-validator';

export class CreateNetworkDTO {
  @IsString()
  src: string;

  @IsString()
  title: string;

  @IsString()
  link: string;

  @IsString()
  @IsMongoId()
  gitUser: string;
}
