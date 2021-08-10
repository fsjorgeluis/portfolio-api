import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';
import { UsersRoles } from 'src/auth/enums';

export type AccountDocument = Account & mongoose.Document;

@Schema()
export class Account {
  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  @ExcludeProperty()
  password: string;

  @Prop({ type: String })
  gitUser: string;

  @Prop({ type: String })
  refreshToken?: string;

  @Prop({ type: String, default: UsersRoles.User })
  role: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
