import { ObjectId } from 'mongoose';

export interface TokenPayload {
  email: string;
  sub: ObjectId;
  role: string;
}
