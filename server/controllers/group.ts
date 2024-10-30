import Group, { IGroup } from '../models/group';
import BaseCtrl from './base';
import { Request, Response } from 'express';
class GroupCtrl extends BaseCtrl<IGroup> {
  model = Group;

  findAllGroupsForResort = async (req: Request, res: Response) => {
    try {
      const output = await this.model.find({ resortID: req.params.resortID });
      return res.status(200).json(output);
    } catch (err) {
      return res.status(400).json({ error: (err as Error).message });
    }
  };
}

export default GroupCtrl;
