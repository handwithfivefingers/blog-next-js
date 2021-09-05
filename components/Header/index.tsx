import React, { useState, useEffect } from 'react';
import MenuLink from '../UI/MenuLink';
import { useRouter } from 'next/router';
import { AiOutlineSearch } from 'react-icons/ai';
import Image from 'next/image';
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
  const [search, setSearch] = useState('');
  const router = useRouter();
  const searchPush = () => {
    router.push({
      pathname: '/search',
      query: { search },
    });
  };

  return (
    <>
      <header>
        <div className="header-left">
          <Image src="/image/logo192.png" width="50" height="50" layout="responsive" alt="favicon" />
        </div>
        <div className="header-middle">
          <input
            type="text"
            placeholder="Searching ... "
            onChange={(e) => setSearch(e.target.value)}
          />
          <AiOutlineSearch className="icon" onClick={searchPush} />
        </div>
        <div className="header-right">
          <span>Project</span>
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
