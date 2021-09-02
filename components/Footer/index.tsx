import React from 'react';
import Image from 'next/image';
import { FaChevronUp } from 'react-icons/fa';
const Footer: React.FC = () => {
  return (
    <>
      <div
        id="scroll-top"
        style={{
          position: 'fixed',
          bottom: 10,
          right: 20,
          backgroundColor: 'rgb(0 0 0 / 25%)',
          padding: '4px 8px',
          borderRadius: 6,
          color: 'rgb(0 0 0 / 75%)',
        }}
      >
        <FaChevronUp
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        />
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
