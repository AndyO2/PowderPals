import Group, { IGroup } from '../models/group';
import BaseCtrl from './base';

class GroupCtrl extends BaseCtrl<IGroup> {
  model = Group;

  joinGroup = async (group: IGroup) => {
    try {
      const newGroup = await this.model.create(group);
      return newGroup;
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
