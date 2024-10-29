import { Group } from "./group.model";

export class User {
  _id?: string;
  username?: string;
  email?: string;
  role?: string;
  bio?: string;
  profilePictureURL?: any;
  groups?: Group[];
}
