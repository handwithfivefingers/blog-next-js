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
const Header = ({loading}) => {
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
    };
    // if (headerRef.current) {
    //   if (top + 30 < headerRef.current.offsetHeight) {
    //     headerRef.current.setAttribute('style', 'position:relative')
    //   } else {
    //     headerRef.current.setAttribute('style', 'position:fixed')
    //   }
    // }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [top]);

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${
          goingUp || loading ? styles.active : styles.deactive
        }`}
      >
        <div className={styles.logo}>
          <Link href="/">
            <a style={{ cursor: 'pointer' }}>
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
        <div className={styles.list_menu}>
          {/* {router.route !== '/' ? (
            <div className="menu" style={{ padding: '20px 0' }}>
              {linkList.map((item) => {
                return (
                  <MenuLink key={item.path} path={item.path} name={item.name} />
                );
              })}
            </div>
          ) : (
            ''
          )} */}
          <ul className={styles.menu_item}>
            {linkList.map((item) => {
              return (
                // <MenuLink key={item.path} path={item.path} name={item.name} />
                <li
                  key={item.path}
                  className={`${styles.item} a ${
                    router.route === item.path ? styles.menu_active : ''
                  }`}
                >
                  <Link href={item.path}>
                    <a>{item.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
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
