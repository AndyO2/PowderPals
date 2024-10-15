import { model, Schema } from 'mongoose';

interface IPost {
  sourceUserID: string;
  title: string;
  caption: string;
  createdAt: Date;
}

const PostSchema = new Schema<IPost>({
  sourceUserID: String,
  title: String,
  caption: String,
  createdAt: Date,
});

const Post = model<IPost>('Post', PostSchema);

export type { IPost };
export default Post;
