import {UserRoles} from '../common/options/userRoles';

export interface IUser {
  userId?: string;
  username?: string;
  displayName: string;
  roleId: number;
  email?: string;
  token?: string;
  image?: string;
  role?: string;
  password?: string;
}

export interface IUpdateProfile {
  displayName: string;
  email: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface ISetPassword {
  userId: string;
  newPassword: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  displayName?: string;
  username?: string;
}

export interface IEditUserForm extends IUser {
  changePassword?: boolean;
}

export class User implements IUser {
  userId?: string = '';
  username?: string = '';
  displayName: string = '';
  roleId: number = UserRoles.Viewer.id;
  email?: string;
  token?: string = '';
  image?: string = '';
  role?: string = '';
  password?: string = '';

  constructor(user?: IUser) {
    if (user) {
      this.userId = user.userId;
      this.username = user.username;
      this.displayName = user.displayName;
      this.email = user.email;
      this.roleId = user.roleId;
      this.token = user.token;
      this.image = user.image;
      this.role = user.role;
      this.password = user.password;
    }
  }

  public getEditUrl() {
    return `/manage/users/${this.userId}`;
  }
}
