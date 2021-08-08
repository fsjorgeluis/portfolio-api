// import { IsString, MaxLength, MinLength } from 'class-validator';
import { Aptitude } from 'src/aptitude/schema/aptitude.schema';
import { Network } from 'src/network/schema/network.schema';
import { Profile } from 'src/profile/schema/profile.schema';
import { Tech } from 'src/tech/schema/tech.schema';
import { Work } from 'src/work/schema/work.schema';

export class CreatePortfolioDTO {
  // @IsString()
  profile: Profile; //img url

  // @IsString()
  socialMedia: Network[]; //img url

  // @IsString()
  aptitudes: Aptitude[];

  // @IsString()
  // @MinLength(4)
  // @MaxLength(50)
  techs: Tech[];

  // @IsString()
  works: Work[];
}
