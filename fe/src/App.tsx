import {observer} from 'mobx-react-lite';
import React, {Fragment, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import ActivityDashboard from './pages/activities/dashboard/ActivityDashboard';
import ActivityDetails from './pages/activities/details/ActivityDetails';
import ActivityForm from './pages/activities/form/ActivityForm';
import ServerError from './pages/errors/ServerError';
import TestErrors from './pages/errors/TestErrors';
import RegisterSuccess from './pages/users/RegisterSuccess';
import CreatePost from './pages/admin/posts/CreatePost';
import Home from './pages/home/Home';
import PostDetail from './pages/posts/detail/PostDetail';
import ModalContainer from './app/common/modals/ModalContainer';
import {useStore} from './app/stores/store';
import TableCategory from './pages/admin/categories/TableCategory';
import TablePost from './pages/admin/posts/TablePost';
import PublicLayout from './app/layout/PublicLayout';
import AdminLayout from './app/layout/AdminLayout';
import EditorLayout from './app/layout/EditorLayout';
import LoginPage from './pages/users/LoginPage';
import RegisterPage from './pages/users/RegisterPage';
import PostCategory from './pages/posts/category/PostCategory';
import EditPost from './pages/admin/posts/EditPost';
import EditCategory from './pages/admin/categories/EditCategory';
import CreateCategory from './pages/admin/categories/CreateCategory';
import CreateUser from './pages/admin/users/CreateUser';
import TableUsers from './pages/admin/users/TableUsers';
import Search from './pages/posts/category/Search';
import EditUser from './pages/admin/users/EditUser';
import EditProfile from './pages/admin/users/EditProfile';
import './App.scss';

// import PrivateRoute from './PrivateRoute';

function App() {
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      // userStore.getFacebookLoginStatus().then(() => commonStore.setAppLoaded());
    }
  }, [commonStore, userStore]);

  // if (!commonStore.appLoaded) return <LoadingComponent content='Loading...' />;

  return (
    <Fragment>
      <ToastContainer position="bottom-right" hideProgressBar/>
      <ModalContainer/>
      <Routes>
        <Route element={<PublicLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/p/:slug" element={<PostDetail/>}/>
          <Route path="/c/:slug" element={<PostCategory/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/errors" element={<TestErrors/>}/>
          <Route path="/server-error" element={<ServerError/>}/>
          <Route
            path="/account/registerSuccess"
            element={<RegisterSuccess/>}
          />
        </Route>

        <Route element={<AdminLayout/>}>
          <Route path="/activities" element={<ActivityDashboard/>}/>
          <Route path="/activities/:id" element={<ActivityDetails/>}/>
          <Route path="/manage/posts/create" element={<CreatePost/>}/>
          <Route path="/manage/posts/:id" element={<EditPost/>}/>
          <Route path="/manage/posts" element={<TablePost/>}/>
          <Route path="/manage/categories/create" element={<CreateCategory/>}/>
          <Route path="/manage/categories/:id" element={<EditCategory/>}/>
          <Route path="/manage/categories" element={<TableCategory/>}/>
          <Route path="/manage/users/add" element={<CreateUser/>}/>
          <Route path="/manage/users" element={<TableUsers/>}/>
          <Route path="/manage/users/:id" element={<EditUser/>}/>
          <Route path="/profile" element={<EditProfile/>}/>
          <Route
            path="/createActivity"
            element={<ActivityForm key="/createActivity"/>}
          />
          <Route
            path="/manage/:id"
            element={<ActivityForm key="/manage/:id"/>}
          />
        </Route>

        <Route element={<EditorLayout/>}>
          <Route path="/createPost" element={<CreatePost/>}/>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default observer(App);
