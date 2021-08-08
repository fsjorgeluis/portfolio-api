import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateTechDTO {
  @IsString()
  src: string; //img font

  @IsString()
  title: string;

  @IsNumber()
  stars: number;

  @IsString()
  @IsMongoId()
  gitUser: string;
}
