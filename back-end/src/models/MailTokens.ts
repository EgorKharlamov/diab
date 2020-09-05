import {
  Schema, Document, Model, model,
} from 'mongoose';

export interface iMailToken extends Document {
  userId: string,
  token: string,
  createdAt: string,
  updatedAt: string,
}

const MailTokenSchema: Schema = new Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
});

export const MailToken: Model<iMailToken> = model<iMailToken>('MailToken', MailTokenSchema);
