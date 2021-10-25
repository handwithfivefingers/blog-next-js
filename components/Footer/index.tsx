import React from 'react';
import Image from 'next/image';
import { FaChevronUp } from 'react-icons/fa';
import styles from './styles.module.scss';
import Link from 'next/link';
const Footer: React.FC = () => {
  return (
    <>
      <div
        className={styles.scroll_top}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
        <FaChevronUp />
      </div>
      <footer
        style={{
          boxShadow: 'var(--main-box-shadow)',
       
        }}
        className={styles.footer}
      >
        <div className={styles.footer_top} style={{}}>
          <ul className={styles.footer_link} style={{}}>
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li>
              <Link href="/story">
                <a>Story</a>
              </Link>
            </li>
            <li>
              <Link href="/english">
                <a>English</a>
              </Link>
            </li>
            <li>
              <Link href="/project-programs">
                <a>Project</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
          <div className={styles.footer_map}>
            <iframe
              width="600"
              height="250"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>
        <div
          className={styles.footer_bottom}
       
        >
          <span style={{ padding: '0 20px' }}>
            Powered by{' '}
            <a href="https://truyenmai.com" style={{ textDecoration: 'none' }}>
              Truyenmai.com
            </a>
            {/* <span className="">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span> */}
          </span>
          <span style={{ padding: '0 20px' }}>
            Copyright <span className="">2019</span>
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
