import React from 'react';
import MenuLink from '../UI/MenuLink';
const linkList = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/blog',
    name: 'Blog',
  },
  {
    path: '/category',
    name: 'Category',
  },
  {
    path: '/about',
    name: 'About',
  },
];
const Header = () => {
  return (
    <>
      <header>
        <div className="header-left">
          <span>Logo</span>
        </div>
        <div className="header-middle">
          <label></label>
          <input type="text" placeholder="Searching ... " />
        </div>
        <div className="header-right">
          <span>Other project</span>
        </div>
      </header>
      <div className="menu">
        {linkList.map((item) => {
          return <MenuLink key={item.path} path={item.path} name={item.name} />;
        })}
      </div>
    </>
  );
};

export default Header;
