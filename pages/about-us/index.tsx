import React from 'react';
import { aboutUsPage } from '../../constant/page';
import parser from 'react-html-parser';
import Head from 'next/head';
import Content from '../../components/Content';
const About: React.FC = (props: any) => {
  return (
    <>
      <Head>{parser(props?.data.page.seo.fullHead)}</Head>
      <Content
        title={'About us'}
        singlePost
        content={
          <div className="row" style={{ margin: 0 }}>
            <div className="about-page" style={{ minHeight: '100vh' }}>
              <h2>About us</h2>
              <div className="wrapper">{parser(props?.data.page.content)}</div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default About;

export const getServerSideProps = async (context) => {
  const { data } = await aboutUsPage;
  return {
    props: {
      data: data,
    },
  };
};
