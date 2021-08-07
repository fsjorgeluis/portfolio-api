import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';
import { Profile } from 'src/profile/schema/profile.schema';

export type NetworkDocument = Network & mongoose.Document;

@Schema()
export class Network {
  @Prop({ type: String })
  src: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  link: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  @ExcludeProperty()
  gitUser: Profile;
}

export const NetworkSchema = SchemaFactory.createForClass(Network);
