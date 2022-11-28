import {convertToSlug} from '../common/util/helpers';

export interface ICategory {
  categoryId?: number;
  shortName: string;
  displayName: string;
  sortOrder: number;
}

export class Category implements ICategory {
  categoryId: number;
  shortName: string;
  displayName: string;
  sortOrder: number;

  constructor(init?: ICategory) {
    if (init) {
      this.categoryId = init.categoryId || 0;
      this.shortName = init.shortName;
      this.displayName = init.displayName;
      this.sortOrder = init.sortOrder;
    } else {
      this.categoryId = 0;
      this.shortName = '';
      this.displayName = '';
      this.sortOrder = 0;
    }
  }

  public getUrl() {
    const slug = convertToSlug(this.shortName) + '-' + this.categoryId;
    return `/c/${slug}`;
  }

  public getEditUrl() {
    return `/manage/categories/${this.categoryId}`;
  }
}
