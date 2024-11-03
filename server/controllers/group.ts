import Group, { IGroup } from '../models/group';
import BaseCtrl from './base';
import { Request, Response } from 'express';
class GroupCtrl extends BaseCtrl<IGroup> {
  model = Group;

  getGroupsForResort = async (req: Request, res: Response) => {
    try {
      const { resortID } = req.params;
      // const queryParams = req.query;

      const params = {
        resortID,
      } as any;

      // const startDateFilter = queryParams.startingFromDate as string;
      // if (startDateFilter) {
      //   params.startDate = new Date(startDateFilter);
      //   console.log('#', startDateFilter);
      // }

      const groups = await this.model.find(params);
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  joinGroup = async (req: Request, res: Response) => {
    try {
      const groupID = req.params.id;
      const userID = req.body.userID;

      // Check if the user is already a member
      const group = await this.model.findById(groupID);
      if (group && group.members.includes(userID)) {
        res.status(400).json({ message: 'User is already a member' });
        return;
      }

      await this.model.findOneAndUpdate(
        { _id: groupID },
        {
          $addToSet: { members: userID },
        }
      );
      res.status(200).json('success');
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
}

export default GroupCtrl;
