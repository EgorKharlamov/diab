import {
  Schema, Document, Model, model,
} from 'mongoose';

export interface iPassRecovery extends Document{
    email: string,
    passRecovery: string,
    createdAt: string,
    updatedAt: string
}

const PassRecoverySchema: Schema = new Schema({
  email: { type: String, required: true },
  passRecovery: { type: String, required: true },
  createdAt: { type: String, required: true, default: new Date().toISOString() },
  updatedAt: { type: String, required: true, default: new Date().toISOString() },
});

export const PassRecovery: Model<iPassRecovery> = model<iPassRecovery>('PassRecovery', PassRecoverySchema);
