import {IChangePassword, ISetPassword, IUpdateProfile, IUser, UserFormValues} from '../models/user';
import requester from './requester';

const Account = {
  current: () => requester.get<IUser>('/account'),
  login: (user: UserFormValues) => requester.post<IUser>('/account/login', user),
  register: (user: UserFormValues) => requester.post<IUser>('/account/register', user),
  fbLogin: (accessToken: string) => requester.post<IUser>(`/account/fbLogin?accessToken=${accessToken}`, {}),
  refreshToken: () => requester.post<IUser>('/account/refreshToken', {}),
  verifyEmail: (token: string, email: string) => requester.post<void>(`/account/verifyEmail?token=${token}&email=${email}`, {}),
  resendEmailConfirmation: (email: string) => requester.get(`/account/resendEmailConfirmation?${email}`),
  list: () => requester.get<IUser[]>('/account/list-user'),
  createUser: (user: IUser) => requester.post<IUser>('/account/add-user', user),
  updateUser: (user: IUser) => requester.put<IUser>('/account/update-user', user),
  setUserPassword: (data: ISetPassword) => requester.put<IUser>('/account/set-password', data),
  deleteUser: (user?: IUser) => requester.del<IUser>('/account/delete-user', {}, {
    params: {
      userId: user?.userId,
    },
  }),
  updateProfile: (data: IUpdateProfile) => requester.put<IUser>('/account/update-me', data),
  changePassword: (data: IChangePassword) => requester.put<IUser>('/account/change-password', data),
};

export default Account;
