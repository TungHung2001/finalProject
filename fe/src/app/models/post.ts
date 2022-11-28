export interface Post {
  id?: number;
  title: string;
  createdDate?: number;
  cover: string;
  shortBody: string;
  fullBody: string;
  innerText?: string;
  categoryIds?: number[];
  categories?: string[];
  likeCount?: number;
  dislikeCount?: number;
  likeValue?: number;
  editor?: string;
}

export class Post implements Post {
  constructor(init?: Post) {
    Object.assign(this, init);
  }
}

export interface ILikePost {
  id: number;
  likeValue: number;
}

export class PostFormValues {
  id?: number = undefined;
  title: string = '';
  createdDate?: number = 0;
  shortBody: string = '';
  fullBody: string = '';
  innerText: string = '';
  categoryIds?: number[] = [];
  categories?: string[] = [];

  constructor(post?: PostFormValues) {
    if (post) {
      this.id = post.id;
      this.title = post.title;
      this.createdDate = post.createdDate || 0;
      this.shortBody = post.shortBody;
      this.fullBody = post.fullBody;
      this.innerText = post.innerText;
      this.categoryIds = post.categoryIds;
      this.categories = post.categories;
    }
  }
}
