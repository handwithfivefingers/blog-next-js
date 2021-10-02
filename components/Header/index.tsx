import React, { useState, useEffect, useRef } from 'react';
import MenuLink from '../UI/MenuLink';
import { useRouter } from 'next/router';
import { AiOutlineSearch } from 'react-icons/ai';
import Image from 'next/image';
import styles from './styles.module.scss';
import { menuQuery } from '../../constant/menu';
import Link from 'next/link';
const linkList = [
  {
    path: '/about-us',
    name: 'About Us',
  },
  {
    path: '/story',
    name: 'Our Story',
  },
  {
    path: '/for-english',
    name: 'For English',
  },
  {
    path: '/project-program',
    name: 'Project/Program',
  },
  {
    path: '/contact',
    name: 'Contact',
  },
];
const Header = () => {
  const [search, setSearch] = useState('');

  const [top, setTop] = useState(0);
  const [goingUp, setGoingUp] = useState(true);

  const headerRef = useRef<HTMLBaseElement>();
  const router = useRouter();
  const searchPush = () => {
    router.push({
      pathname: '/search',
      query: { search },
    });
  };
  let previousTop = 0;
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY; // current
      // headerRef.current = currentScrollY;
      setTop((prevState) => {
        previousTop = prevState;
        if (previousTop < currentScrollY && currentScrollY > 65) {
          setGoingUp(false);
        }
        if (previousTop > currentScrollY) {
          setGoingUp(true);
        }
        return currentScrollY;
      });
      // console.log(goingUp, currentScrollY, '-', previousTop);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [top]);
  return (
    <>
      <header
        ref={headerRef}
        className={`${goingUp ? styles.active : styles.deactive}`}
      >
        <div className="header-left">
          <Link href="/">
            <a style={{cursor:'pointer'}}>
            <Image
              src="/image/logo192.png"
              width="50"
              height="50"
              layout="responsive"
              alt="favicon"
            />
            </a>
          </Link>
        </div>
        <div className="header-middle">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                event.preventDefault();
                searchPush();
              }
            }}
          />
          <AiOutlineSearch className="icon" onClick={searchPush} />
        </div>
        <div className="header-right">
          <span>Project</span>
        </div>
      </header>
      {router.route !== '/' ? (
        <div className="menu" style={{ padding: '20px 0' }}>
          {linkList.map((item) => {
            return (
              <MenuLink key={item.path} path={item.path} name={item.name} />
            );
          })}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Header;

// export const getServerSideProps = async (context) => {
//   const { data } = await menuQuery;
//   return {
//     props: data,
//   };
// };
