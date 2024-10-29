import { model, Schema } from 'mongoose';
import User from './user';
import Resort from './resort';

interface IGroup {
  users: (typeof User)[];
  name: string;
  resort: typeof Resort;
  description: string;
  location: string;
  date: Date;
  members: (typeof User)[];
  cost: number;
}

const groupSchema = new Schema<IGroup>({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  date: { type: Date, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  resort: { type: Schema.Types.ObjectId, ref: 'Resort' },
  cost: { type: Number },
});

const Group = model<IGroup>('Group', groupSchema);

export type { IGroup };
export default Group;
