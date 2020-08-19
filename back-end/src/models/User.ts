import {
  Schema, Document, Model, model,
} from 'mongoose';

export interface iUser extends Document{
    login: {
        login: string,
        pass: string,
        email: {
          value: string,
          verified: boolean
        },
        phone?: {
          value: string,
          verified: boolean
        },
    },
    count: number,
    createdAt: string,
    updatedAt: string
}

const UserSchema: Schema = new Schema({
  login: {
    login: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    email: {
      value: { type: String },
      verified: { type: Boolean, default: false },
    },
    phone: {
      value: { type: String },
      verified: { type: Boolean, default: false },
    },
  },
  count: { type: Number, required: true, default: 0 },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
});

export const User: Model<iUser> = model<iUser>('User', UserSchema);
