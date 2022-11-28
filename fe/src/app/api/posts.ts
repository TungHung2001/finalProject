// import {PaginatedResult} from '../models/pagination';
import requester from './requester';
import {ILikePost, Post, PostFormValues} from '../models/post';
import {IPaginationParams, IPaginationResponse} from '../models/api';

interface IGetPostParams extends IPaginationParams {
  categoryId?: number;
  keyword?: string;
}

const Posts = {
  list: (params?: IGetPostParams) => requester.get<Post[]>('/post', params),
  listV2: (params?: IGetPostParams) => requester.get<IPaginationResponse<Post>>('/post/listv2', params),
  detail: (id: number) => requester.get<Post>(`/post/${id}`),
  create: (post: PostFormValues) => requester.post<number>('/post', post),
  update: (post: PostFormValues) => requester.put<void>(`/post/${post.id}`, post),
  like: (postId: number, data: ILikePost) => requester.put<void>(`/post/${postId}/like`, {}, {params: data}),
  delete: (id: number) => requester.del<void>(`/post/${id}`),
};

export default Posts;
