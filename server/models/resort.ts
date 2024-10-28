import { model, Schema } from 'mongoose';

interface IResort {
  name: string;
  city: string;
  address: string;
  state: string;
  country: string;
  continent: string;
  rating: number;
  priceLevel: number;
}

const resortSchema = new Schema<IResort>({
  name: { type: String, required: true },
  city: String,
  state: String,
  country: String,
  address: String,
  continent: String,
  rating: Number,
  priceLevel: Number,
});

const Resort = model<IResort>('Resort', resortSchema);

export type { IResort };
export default Resort;
