import {Photo, Profile, UserActivity} from '../models/profile';
import axios from 'axios';
import requester from './requester';

const Profiles = {
  get: (username: string) => requester.get<Profile>(`/profiles/${username}`),
  uploadPhoto: (file: Blob) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios.post<Photo>('photos', formData, {
      headers: {'Content-type': 'multipart/form-data'},
    });
  },
  setMainPhoto: (id: string) => requester.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requester.del(`/photos/${id}`),
  updateProfile: (profile: Partial<Profile>) => requester.put(`/profiles`, profile),
  updateFollowing: (username: string) => requester.post(`/follow/${username}`, {}),
  listFollowings: (username: string, predicate: string) => requester.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
  listActivities: (username: string, predicate: string) => requester.get<UserActivity[]>(`/profiles/${username}/activities?predicate=${predicate}`),
};

export default Profiles;
