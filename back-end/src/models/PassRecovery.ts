import {
  Schema, Document, Model, model,
} from 'mongoose';
import { dateIsoString } from '../helpers/Dairy/dates';

export interface iPassRecovery extends Document {
  userId: string,
  email: string,
  passRecovery: string,
  createdAt: string,
  updatedAt: string
}

const PassRecoverySchema: Schema = new Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  passRecovery: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
});

export const PassRecovery: Model<iPassRecovery> = model<iPassRecovery>('PassRecovery', PassRecoverySchema);
