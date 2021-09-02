import React from 'react';
import Image from 'next/image';
const Footer: React.FC = () => {
  return (
    <footer
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        boxShadow: 'var(--main-box-shadow)',
        padding: '50px',
        marginTop:'50px'
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
  );
};

export default Footer;
