export interface INote {
  id?: number;
  postId: number;
  content: string;
  createdDate?: number;
  userId?: string;
  userName?: string;
}

export class Note implements INote {
  id?: number;
  postId: number;
  content: string;
  createdDate?: number = 0;
  userId?: string;
  userName?: string;

  constructor(init?: INote) {
    if (init) {
      this.id = init.id || 0;
      this.postId = init.postId;
      this.content = init.content;
      this.createdDate = init.createdDate || 0;
      this.userId = init.userId;
      this.userName = init.userName;
    } else {
      this.id = 0;
      this.postId = 0;
      this.content = '';
    }
  }
}
