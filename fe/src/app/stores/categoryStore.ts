import {makeAutoObservable} from 'mobx';
import agent from '../api/agent';
import {Category} from '../models/category';

export default class CategoryStore {
  categories: Category[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getCategories = async (reload?: boolean): Promise<Category[]> => {
    if (!this.categories.length || reload) {
      const categories = await agent.Categories.list({
        pageNumber: 1,
        pageSize: 100,
      });
      this.categories = [];
      categories.forEach(category => {
        this.categories.push(new Category(category));
      });
    }
    return this.categories;
  };

  getCategory = async (categoryId: number): Promise<Category | undefined> => {
    await this.getCategories();
    return this.categories.find(c => c.categoryId === categoryId);
  };
}
