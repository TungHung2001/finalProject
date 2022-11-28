import requester from './requester';
import {IPaginationParams} from '../models/api';
import {INote} from '../models/note';

interface IGetCommentParams extends IPaginationParams {
  postId: number;
  lastNoteId?: number;
}

const Notes = {
  list: (params?: IGetCommentParams) => requester.get<INote[]>('/note', params),
  create: (note: INote, postId: number) => requester.post<INote>('/note', note, {params: {postId}}),
};

export default Notes;
