import Group, { IGroup } from '../models/group';
import BaseCtrl from './base';
import { IUser } from '../models/user';

class GroupCtrl extends BaseCtrl<IGroup> {
  model = Group;

  joinGroup = async (groupId: string, user: IUser) => {
    try {
      // Find the group by ID and push the new user ID into the users array
      const updatedGroup = await this.model.findByIdAndUpdate(
        groupId,
        { $addToSet: { users: user } }, // Ensures no duplicate users
        { new: true } // Return the updated document
      );

      return updatedGroup;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  filterByAttributes = async (filters: any) => {
    try {
      const groups = await this.model.find(filters);
      return groups;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  findUsersInGroup = async (groupId: string) => {
    const users = await this.model.findById(groupId).populate('members');
    return users;
  };

  findGroupsAtResort = async (resortId: string) => {
    const resortGroups = await Group.find({ resort: resortId });
    return resortGroups;
  };
}

export default GroupCtrl;
