import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import {Button, Container, Dropdown, Image, Menu} from "semantic-ui-react";
import {useStore} from "../stores/store";
import {UserRoles} from '../common/options/userRoles';
import {useEffect, useState} from 'react';
import {Category} from '../models/category';
import MobileMenu from './MobileMenu';
import SearchBox from './SearchBox';

export default observer(function Navbar() {
  const {userStore: {user, logout, isLoggedIn}, categoryStore: {getCategories}} = useStore();
  const [categories, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(data => {
      setCategory(data.slice(0, 5));
    }).catch(error => {
      console.error(error);
    });
  }, [getCategories]);

  return (
    <>
      <Menu inverted fixed="top" className="main-nav">
        <Container>
          <MobileMenu categories={categories}/>
          <Menu.Item as={NavLink} to="/" end header className="nav-home-page">
            Tech Review
          </Menu.Item>
          {
            categories.map((category => (
              <Menu.Item
                key={category.categoryId}
                as={NavLink}
                to={category.getUrl()}
                name={category.displayName}
                title={category.displayName}
                className={`category-item hidden-mobile hidden-tablet`}
              />
            )))
          }
          {
            isLoggedIn && user &&
            <>
              <Menu.Item position="right">
                <SearchBox/>
                <Image src={user?.image || '/assets/user.png'} avatar spaced="right"/>
                <Dropdown pointing="top right" text={user?.displayName}>
                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to={`/profile`} text="My Profile" icon="user"/>
                    {
                      [UserRoles.Admin.id, UserRoles.Editor.id].includes(user?.roleId) &&
                      <>
                        <Dropdown.Item as={NavLink} to={`/manage/posts`} text="Admin Area" icon="dashboard"/>
                      </>
                    }
                    {/*<Dropdown.Item as={NavLink} to={`/profiles/${user?.username}`} text="My Profile" icon="user"/>*/}
                    <Dropdown.Item onClick={logout} text="Logout" icon="power"/>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            </>
          }
          {
            !isLoggedIn &&
            <>
              <Menu.Item position="right">
                <SearchBox/>
                <Button as={NavLink} to="/login" inverted={false}>
                  Log in
                </Button>
                <Button as={NavLink} to="/register" inverted={false} primary={true} style={{marginLeft: '0.5em'}}>
                  Register
                </Button>
              </Menu.Item>
            </>
          }
        </Container>
      </Menu>
    </>
  );
},
);
