import { model, Schema } from 'mongoose';

interface IGroup {
  name: string;
  startDate: Date;
  endDate: Date;
  //
  organizerUserID: Schema.Types.ObjectId;
  members: Schema.Types.ObjectId[];
  resortID: Schema.Types.ObjectId;
}

const groupSchema = new Schema<IGroup>({
  name: { type: String, required: true },
  organizerUserID: { type: Schema.Types.ObjectId, ref: 'User' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  resortID: { type: Schema.Types.ObjectId, ref: 'Resort' },
});

const Group = model<IGroup>('Group', groupSchema);

export type { IGroup };
export default Group;
