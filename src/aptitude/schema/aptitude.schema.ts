import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';
import { Profile } from 'src/profile/schema/profile.schema';

export type AptitudeDocument = Aptitude & mongoose.Document;

@Schema()
export class Aptitude {
  @Prop({ type: String })
  src: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: Number })
  stars: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  @ExcludeProperty()
  gitUser: Profile;
}

export const AptitudeSchema = SchemaFactory.createForClass(Aptitude);
