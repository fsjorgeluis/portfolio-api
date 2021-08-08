import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';
import { Aptitude } from 'src/aptitude/schema/aptitude.schema';
import { Network } from 'src/network/schema/network.schema';
import { Profile } from 'src/profile/schema/profile.schema';
import { Tech } from 'src/tech/schema/tech.schema';
import { Work } from 'src/work/schema/work.schema';

export type PortfolioDocument = Portfolio & mongoose.Document;

@Schema()
export class Portfolio {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile: Profile;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Network' }] })
  socialMedia: Network[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Aptitude' }] })
  aptitudes: Aptitude[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tech' }] })
  techs: Tech[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }] })
  works: Work[];
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
