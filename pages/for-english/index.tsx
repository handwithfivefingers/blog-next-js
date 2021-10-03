import React from 'react';
import { getSinglePage, Pages } from '../../constant/page';
// import { contactPage } from '../../constant/page';
import parser from 'react-html-parser';
import Head from 'next/head';
const ForEnglish = (props) => {
  return (
    <>
      <Head>{parser(props?.data.page.seo.fullHead)}</Head>
      <div className="row" style={{ margin: 0 }}>
        <div className="about-page" style={{ minHeight: '100vh' }}>
          <h2>For English</h2>
          <div className="wrapper">{parser(props?.data.page.content)}</div>
        </div>
      </div>
    </>
  );
};

export default ForEnglish;

export const getServerSideProps = async (context) => {
  const { data } = await getSinglePage(Pages.ForEnglish);
  return {
    props: {
      data: data,
    },
  };
};
