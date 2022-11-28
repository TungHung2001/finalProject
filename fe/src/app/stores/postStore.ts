import {makeAutoObservable} from 'mobx';
import {Post} from '../models/post';
import {dummyPosts} from '../../dummy/posts';
import agent from '../api/agent';

export default class PostStore {
  latestPosts: Post[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getLatestPosts = async (): Promise<Post[]> => {
    if (!this.latestPosts.length) {
      try {
        this.latestPosts = await agent.Posts.list({
          pageNumber: 1,
          pageSize: 100,
        });
      } catch (error) {
        this.latestPosts = [...dummyPosts];
      }
    }
    return this.latestPosts;
  };
}
