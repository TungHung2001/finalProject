import axios from 'axios';
import {PaginatedResult} from '../models/pagination';
import {Activity, ActivityFormValues} from '../models/activity';
import requester, {responseBody} from './requester';

const Activities = {
  list: (params: URLSearchParams) => axios.get<PaginatedResult<Activity[]>>('/activities', { params }).then(responseBody),
  details: (id: string) => requester.get<Activity>(`/activities/${id}`),
  create: (activity: ActivityFormValues) => requester.post<void>('/activities', activity),
  update: (activity: ActivityFormValues) => requester.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requester.del<void>(`/activities/${id}`),
  attend: (id: string) => requester.post<void>(`/activities/${id}/attend`, {})
}

export default Activities;
