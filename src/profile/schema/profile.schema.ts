import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop({ type: String })
  photo?: string; //img url

  @Prop({ type: String })
  avatar?: string; //img url

  @Prop({ type: String })
  fullName?: string;

  @Prop({ type: String, required: true, unique: true })
  gitUser: string;

  @Prop({ type: String })
  greet?: string;

  @Prop({ type: String })
  bio?: string;

  @Prop({ type: Number, default: 0 })
  gitPublicRepos?: number;

  @Prop({ type: Number, default: 0 })
  gitFollowers?: number;

  @Prop({ type: Number, default: 0 })
  gitFollowing?: number;

  @Prop({ type: String })
  cv?: string; //cv url
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
