import { Router, Application } from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import ResortCtrl from './controllers/resort';
import GroupCtrl from './controllers/group';

const setRoutes = (app: Application): void => {
  const router = Router();
  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const resortCtrl = new ResortCtrl();
  const groupCtrl = new GroupCtrl();

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

  // Groups
  router.route('/groups').get(groupCtrl.getAll);
  router.route('/groups/count').get(groupCtrl.count);
  router.route('/group').post(groupCtrl.insert);
  router.route('/group/:id').get(groupCtrl.get);
  router.route('/group/:id').put(groupCtrl.update);
  router.route('/group/:id').delete(groupCtrl.delete);
  // custom
  router.route('/groups/resort/:resortID').get(groupCtrl.getGroupsForResort);
  router.route('/groups/:id/join').put(groupCtrl.joinGroup);

  // Resorts
  router.route('/resorts').get(resortCtrl.getAll);
  router.route('/resorts/count').get(resortCtrl.count);
  router.route('/resort').post(resortCtrl.insert);
  router.route('/resort/:id').get(resortCtrl.get);
  router.route('/resort/:id').put(resortCtrl.update);
  router.route('/resort/:id').delete(resortCtrl.delete);

  // Test routes
  if (process.env.NODE_ENV === 'test') {
    router.route('/cats/delete').delete(catCtrl.deleteAll);
    router.route('/users/delete').delete(userCtrl.deleteAll);
  }

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
};

export default setRoutes;
