import { Router, Application } from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import PostCtrl from './controllers/post';

const setRoutes = (app: Application): void => {
  const router = Router();
  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const postCtrl = new PostCtrl();

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Posts
  router.route('/posts').get(postCtrl.getAll);
  router.route('/posts/count').get(postCtrl.count);
  router.route('/post').post(postCtrl.insert);
  router.route('/post/:id').get(postCtrl.get);
  router.route('/post/:id').put(postCtrl.update);
  router.route('/post/:id').delete(postCtrl.delete);

  // Test routes
  if (process.env.NODE_ENV === 'test') {
    router.route('/cats/delete').delete(catCtrl.deleteAll);
    router.route('/users/delete').delete(userCtrl.deleteAll);
  }

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

};

export default setRoutes;
