import React, {useCallback, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';
import {UserRoles} from '../common/options/userRoles';

interface IProps {
  roleId: number;
}

const AdminNav = (props: IProps) => {
  const [activeItem, setActiveItem] = useState('');
  const {roleId} = props;

  const handleItemClick = useCallback((e: any, data: any) => {
    setActiveItem(data.name);
  }, []);

  return (
    <div className="admin-nav">
      <Menu vertical={true}>
        <Menu.Item>
          <Menu.Header>Account</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name="My Profile"
              as={NavLink}
              to="/profile"
              active={activeItem === "My Profile"}
              onClick={handleItemClick}
              end
            />
          </Menu.Menu>
        </Menu.Item>
        {
          roleId !== UserRoles.Viewer.id &&
          <Menu.Item>
            <Menu.Header>Manage Posts</Menu.Header>
            <Menu.Menu>
              <Menu.Item
                name="All Posts"
                as={NavLink}
                to="/manage/posts"
                active={activeItem === "All Posts"}
                onClick={handleItemClick}
                end
              />
              <Menu.Item
                name="Create Post"
                as={NavLink}
                to="/manage/posts/create"
                active={activeItem === "Create Post"}
                onClick={handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>
        }
        {
          roleId === UserRoles.Admin.id &&
          <>
            <Menu.Item>
              <Menu.Header>Manage Categories</Menu.Header>
              <Menu.Menu>
                <Menu.Item
                  name="All Categories"
                  as={NavLink}
                  to="/manage/categories"
                  active={activeItem === "All Categories"}
                  onClick={handleItemClick}
                  end
                />
                <Menu.Item
                  name="Create Category"
                  as={NavLink}
                  to="/manage/categories/create"
                  active={activeItem === "Create Category"}
                  onClick={handleItemClick}
                />
              </Menu.Menu>
            </Menu.Item>
            <Menu.Item>
              <Menu.Header>Manage Users</Menu.Header>
              <Menu.Menu>
                <Menu.Item
                  name="All Users"
                  as={NavLink}
                  to="/manage/users"
                  active={activeItem === "All Users"}
                  onClick={handleItemClick}
                  end
                />
                <Menu.Item
                  name="Add User"
                  as={NavLink}
                  to="/manage/users/add"
                  active={activeItem === "Add User"}
                  onClick={handleItemClick}
                />
              </Menu.Menu>
            </Menu.Item>
          </>
        }
      </Menu>
    </div>
  );
};

export default AdminNav;
