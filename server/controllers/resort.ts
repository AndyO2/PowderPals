import Resort, { IResort } from '../models/resort';
import BaseCtrl from './base';

class ResortCtrl extends BaseCtrl<IResort> {
  model = Resort;
}

export default ResortCtrl;
