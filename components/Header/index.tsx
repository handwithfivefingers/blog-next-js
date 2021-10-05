import React, { useState, useEffect, useRef } from 'react';
import MenuLink from '../UI/MenuLink';
import { useRouter } from 'next/router';
import { FaSearch, FaTimes, FaHome, FaEllipsisH } from 'react-icons/fa';
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

const Header = ({ loading }) => {
  const [show, setShow] = useState(false);
  const [mMenu, setMMenu] = useState(false);
  const [search, setSearch] = useState('');
  const [top, setTop] = useState(0);
  const [goingUp, setGoingUp] = useState(true);

  const headerRef = useRef<HTMLBaseElement>();
  const router = useRouter();
  const searchPush = () => {
    setShow(false);
    router.push({
      pathname: '/search',
      query: { search },
    });
  };
  let previousTop = 0;
  useEffect(() => {
    setMMenu(false);
  }, [router.route]);
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
  const renderSearchBar = () => {
    let xhtml = null;
    xhtml = (
      <div className={styles.SearchModal}>
        <div className={styles.SearchModalBody}>
          <input
            placeholder="Search here..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => searchPush()}>
            <FaSearch />
          </button>
        </div>
        <div className={styles.GoBack} onClick={() => setShow(!show)}>
          <FaTimes />
        </div>
      </div>
    );
    return xhtml;
  };
  return (
    <>
      <header
        ref={headerRef}
        className={`${goingUp || loading ? styles.active : styles.deactive} ${
          styles.headerWrapper
        }`}
      >
        <div className={`${styles.header_destop}`}>
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
            <ul className={styles.menu_item}>
              {linkList.map((item) => {
                return (
                  <li
                    key={item.path}
                    className={`${styles.item} ${
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
          <div className={styles.searchbar} onClick={() => setShow(!show)}>
            <FaSearch />
          </div>
        </div>
        <ul className={`${styles.header_mobile}`}>
          <li
            className={`${styles.menu_item} ${
              router.route === '/' ? styles.menu_active : ''
            } `}
          >
            <Link href="/">
              <a>
                <span>
                  <FaHome />
                </span>
                <span>Home</span>
              </a>
            </Link>
          </li>
          <li
            className={`${styles.menu_item} ${
              router.route === '/story' ? styles.menu_active : ''
            } `}
          >
            <Link href="/story">
              <a>
                <span>
                  <FaHome />
                </span>
                <span>Blog</span>
              </a>
            </Link>
          </li>
          <li className={`${styles.menu_item}`}>
            <span>
              <FaSearch onClick={() => setShow(!show)} />
            </span>
          </li>
          <li
            className={`${styles.menu_item} ${
              router.route === '/about-us' ? styles.menu_active : ''
            } `}
          >
            <Link href="/about-us">
              <a>
                <span>
                  <FaHome />
                </span>
                <span>About</span>
              </a>
            </Link>
          </li>
          <li className={styles.menu_item}>
            <span
              className={styles.other_item}
              onClick={() => setMMenu(!mMenu)}
            >
              <FaEllipsisH />
            </span>
            {mMenu ? (
              <span className={styles.menu_dropdown}>
                <Link href="/project-program">
                  <a>
                    <span>
                      <FaHome />
                    </span>
                    <span>Project</span>
                  </a>
                </Link>
                <Link href="/for-english">
                  <a>
                    <span>
                      <FaHome />
                    </span>
                    <span>For English</span>
                  </a>
                </Link>
                <Link href="/contact">
                  <a>
                    <span>
                      <FaHome />
                    </span>
                    <span>Contact</span>
                  </a>
                </Link>
              </span>
            ) : (
              ''
            )}
          </li>
        </ul>
      </header>
      {show ? renderSearchBar() : ''}
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
