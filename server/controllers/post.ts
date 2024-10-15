import Post, { IPost } from '../models/post';
import BaseCtrl from './base';

class PostCtrl extends BaseCtrl<IPost> {
  model = Post;
}

export default PostCtrl;
