import requester from './requester';

const Photos = {
  uploadPostPhoto: (data: any) => requester.upload<string>('/Photos/AddPostPhoto', data),
  uploadUserPhoto: (data: any) => requester.upload<string>('/Photos/AddUserPhoto', data),
};

export default Photos;
