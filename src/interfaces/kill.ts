import { User } from './user';
import { Group } from './group';

export interface KillsData {
  kills: Kill[];
}

export interface Kill {
  id:      string;
  low:     number;
  idUser:  User;
  idGroup: Group;
  createdAt: Date;
  updatedAt?: Date;
}