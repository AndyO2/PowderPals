import { model, Schema } from 'mongoose';

interface IResort {
  name: string;
  city: string;
  state: string;
  country: string;
  longitude: number;
  latitude: number;
  rating: number;
}

const resortSchema = new Schema<IResort>({
  name: String,
  city: String,
  state: String,
  country: String,
  longitude: Number,
  latitude: Number,
  rating: Number,
});

const Resort = model<IResort>('Resort', resortSchema);

export type { IResort };
export default Resort;
