import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import Navbar from "./Navbar";
import AdminNav from "./AdminNav";
import {Container, Grid} from "semantic-ui-react";
import {useStore} from '../stores/store';
import {UserRoles} from '../common/options/userRoles';

type Props = {};

const AdminLayout: React.FC<Props> = () => {
  const {userStore: {user, isLoggedIn}} = useStore();
  const location = useLocation();

  if (!isLoggedIn || !user?.roleId || (user.roleId === UserRoles.Viewer.id && location.pathname !== '/profile')) {
    return (
      <Navigate to="/"/>
    );
  }

  return (
    <>
      <Navbar/>
      <div className="main admin-page">
        <div className="app-body-wrapper">
          <Container>
            <Grid>
              <Grid.Column computer={3} tablet={3} mobile={16}>
                <AdminNav roleId={user.roleId}/>
              </Grid.Column>
              <Grid.Column computer={13} tablet={13} mobile={16}>
                <Outlet/>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
};

export default React.memo(AdminLayout);
