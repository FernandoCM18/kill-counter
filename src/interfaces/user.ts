import { Group } from './group';

// Generated by https://quicktype.io

export interface UserData {
  users: User[];
}

export interface User {
  id?:        string;
  name?:      string;
  username?:  string;
  email?:     string;
  password?:   string;
  groups?:    null;
  createdAt?: string;
  updatedAt?: string;
}

export interface QueryME {
  me: {
    id?: string;
    name?: string;
    username?: string;
    email?: string;
    groups?: Group[];
    totalKills?: number;
  }
}

export interface QuerySearch {
  search: User[]
}
