import requester from './requester';
import {IPaginationParams} from '../models/api';
import {ICategory} from '../models/category';

const Categories = {
  list: (params?: IPaginationParams) => requester.get<ICategory[]>('/category', params),
  detail: async (id: number): Promise<ICategory> => {
    const list = await requester.get<ICategory[]>('/category', {
      pageNumber: 1,
      pageSize: 100,
    });
    const c = list.find(item => item.categoryId === id);
    if (!c) {
      throw new Error('Category not found!');
    }
    return c;
  },
  create: (category: ICategory) => requester.post<number>('/category', category),
  update: (category: ICategory) => requester.put<void>(`/category`, category),
  delete: (id: number) => requester.del<void>(`/category/${id}`),
};

export default Categories;
