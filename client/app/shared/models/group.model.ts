import { Resort } from './resort.model';
import { User } from './user.model';
export class Group {
  _id?: string;
  name?: string;
  resort?: Resort;
  users?: User[];
  startDate?: Date;
  endDate?: Date;
}
