import {
  Schema, Document, Model, model,
} from 'mongoose';

export interface iDairy extends Document{
  userId: string,

  date: string,
  pressure: {
      up: number,
      down: number
  },
  glucose: number,
  weight: number,

  createdAt: string,
  updatedAt: string
}

const DairySchema: Schema = new Schema({
  userId: { type: String, required: true },

  date: { type: String, required: true },
  pressure: {
    up: { type: Number, required: true },
    down: { type: Number, required: true },
  },
  glucose: { type: Number, required: true },
  weight: { type: Number, required: true },

  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
});

export const Dairy: Model<iDairy> = model<iDairy>('Dairy', DairySchema);
