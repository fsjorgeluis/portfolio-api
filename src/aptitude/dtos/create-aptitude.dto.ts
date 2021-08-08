import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateAptitudeDTO {
  @IsString()
  src: string; //icon font

  @IsString()
  title: string;

  @IsNumber()
  stars: number;

  @IsString()
  @IsMongoId()
  gitUser: string;
}
