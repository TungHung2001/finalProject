import {makeAutoObservable} from 'mobx';
import agent from '../api/agent';
import {User} from '../models/user';

export default class AccountStore {
  users: User[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getUsers = async (reload?: boolean): Promise<User[]> => {
    if (!this.users.length || reload) {
      const data = await agent.Account.list();
      this.users = [];
      data.forEach(user => {
        this.users.push(new User(user));
      });
    }
    return this.users;
  };

  getUserDetail = async (userId: string): Promise<User | undefined> => {
    await this.getUsers(true);
    return this.users.find(c => c.userId === userId);
  };
}
