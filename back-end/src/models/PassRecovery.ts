import {
  Schema, Document, Model, model,
} from 'mongoose';

export interface iPassRecovery extends Document{
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
  createdAt: { type: String, required: true, default: new Date().toISOString() },
  updatedAt: { type: String, required: true, default: new Date().toISOString() },
});

export const PassRecovery: Model<iPassRecovery> = model<iPassRecovery>('PassRecovery', PassRecoverySchema);
