export class Post {
  _id?: string;
  sourceUserID?: string;
  title?: string;
  caption?: string;
  createdAt?: Date;

  constructor(id?: string, sourceUserID?: string, title?: string, caption?: string, createdAt?: Date) {
    this._id = id;
    this.sourceUserID = sourceUserID;
    this.title = title;
    this.caption = caption;
    this.createdAt = createdAt;
  }
}
