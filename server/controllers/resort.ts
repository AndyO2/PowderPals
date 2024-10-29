import Resort, { IResort } from '../models/resort';
import BaseCtrl from './base';

class ResortCtrl extends BaseCtrl<IResort> {
  model = Resort;

  filterByAttributes = async (filters: any) => {
    try {
      const resorts = await this.model.find(filters);
      return resorts;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  

  // resortGroups = await Group.find({ resort: resortId });
}

export default ResortCtrl;
