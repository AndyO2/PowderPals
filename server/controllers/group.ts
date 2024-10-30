import Group, { IGroup } from '../models/group';
import BaseCtrl from './base';
import { Request, Response } from 'express';
class GroupCtrl extends BaseCtrl<IGroup> {
  model = Group;

  getGroupsForResort = async (req: Request, res: Response) => {
    try {
      const { resortID } = req.params;
      const groups = await this.model.find({ resortID });
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json(error);
    }
  };
}

export default GroupCtrl;
