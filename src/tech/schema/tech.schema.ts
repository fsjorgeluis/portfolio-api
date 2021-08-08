import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';
import { Profile } from 'src/profile/schema/profile.schema';

export type TechDocument = Tech & mongoose.Document;

@Schema()
export class Tech {
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

export const TechSchema = SchemaFactory.createForClass(Tech);
