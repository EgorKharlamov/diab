import {
  Schema, Document, Model, model,
} from 'mongoose';

export enum eUserRoles {
  admin,
  user
}
export interface iUser extends Document{
  user: {
    login: {
      value: string,
      valueShowed: string
    },
    pass: string,
    email: {
      value: string,
      valueShowed: string,
      verified: boolean
    },
    phone?: {
      value: string,
      verified: boolean
    },
    role: number
  },
  count: number,
  createdAt: string,
  updatedAt: string
}

const UserSchema: Schema = new Schema({
  user: {
    login: {
      value: { type: String, required: true, unique: true },
      valueShowed: { type: String, required: true, unique: true },
    },
    pass: { type: String, required: true },
    email: {
      value: { type: String },
      valueShowed: { type: String },
      verified: { type: Boolean, default: false },
    },
    phone: {
      value: { type: String },
      verified: { type: Boolean, default: false },
    },
    role: { type: Number, required: true, default: eUserRoles.user },
  },
  count: { type: Number, required: true, default: 0 },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
});

export const User: Model<iUser> = model<iUser>('User', UserSchema);
