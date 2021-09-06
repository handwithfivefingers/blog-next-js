import React from 'react';
import Image from 'next/image';
import { FaChevronUp } from 'react-icons/fa';
import styles from './styles.module.scss';
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
          display: 'flex',
          justifyContent: 'space-around',
          boxShadow: 'var(--main-box-shadow)',
          padding: '50px',
          marginTop: '50px',
        }}
      >
        <a style={{ padding: '0 20px' }}>
          Powered by{' '}
          <span className="">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
        <a style={{ padding: '0 20px' }}>
          Copyright <span className="">2019</span>
        </a>
      </footer>
    </>
  );
};

export default Footer;
