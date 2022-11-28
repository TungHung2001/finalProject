import {createContext, useContext} from "react";
import AccountStore from "./accountStore";
import ActivityStore from "./activityStore";
import CategoryStore from "./categoryStore";
import CommentStore from "./commentStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import PostStore from "./postStore";
import UserStore from "./userStore";

interface Store {
  accountStore: AccountStore,
  activityStore: ActivityStore
  categoryStore: CategoryStore;
  commentStore: CommentStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  postStore: PostStore;
  profileStore: ProfileStore;
  userStore: UserStore;
}

export const store: Store = {
  accountStore: new AccountStore(),
  activityStore: new ActivityStore(),
  categoryStore: new CategoryStore(),
  commentStore: new CommentStore(),
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
  postStore: new PostStore(),
  profileStore: new ProfileStore(),
  userStore: new UserStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
