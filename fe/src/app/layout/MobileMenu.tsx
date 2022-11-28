import React, {useCallback, useState} from 'react';
import {Menu} from 'semantic-ui-react';
import {Category} from '../models/category';
import {NavLink} from 'react-router-dom';

interface IProps {
  categories: Category[];
}

function MobileMenu(props: IProps) {
  const [isShow, setIsShow] = useState(false);
  const {categories} = props;

  const toggleMenu = useCallback(() => {
    setIsShow(v => !v);
  }, []);

  return (
    <>
      <Menu.Item
        name=""
        icon="sidebar"
        className="visible-mobile hidden-pc clickable"
        onClick={toggleMenu}
      />
      <div className={`mobile-menu ${isShow ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="mobile-menu-backdrop"/>
        <div className="mobile-menu-content">
          <div className="website-name">Tech Review</div>
          {
            categories.map((category => (
              <Menu.Item
                key={category.categoryId}
                as={NavLink}
                to={category.getUrl()}
                name={category.displayName}
                title={category.displayName}
                className={`hidden-mobile`}
              />
            )))
          }
        </div>
      </div>
    </>
  );
}

export default React.memo(MobileMenu);
