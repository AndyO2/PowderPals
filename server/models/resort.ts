import { model, Schema } from 'mongoose';

interface IResort {
  name: string;
  city: string;
  state: string;
  country: string;
  address: string;
  continent: string;
  longitude: number;
  latitude: number;
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
  longitude: Number,
  latitude: Number,
  rating: Number,
  priceLevel: Number,
});

const Resort = model<IResort>('Resort', resortSchema);

export type { IResort };
export default Resort;
