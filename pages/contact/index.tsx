import React from 'react';
import { getSinglePage, Pages } from '../../constant/page';
// import { contactPage } from '../../constant/page';
import parser from 'react-html-parser';
import Head from 'next/head';
const Contact = (props) => {
  return (
    <>
      <Head>{parser(props?.data.page.seo.fullHead)}</Head>
      <div className="row" style={{ margin: 0 }}>
        <div className="about-page" style={{ minHeight: '100vh' }}>
          <h2>About us</h2>
          <div className="wrapper">{parser(props?.data.page.content)}</div>
        </div>
      </div>
    </>
  );
};

export default Contact;

export const getServerSideProps = async (context) => {
  const { data } = await getSinglePage(Pages.ContactUs);
  return {
    props: {
      data: data,
    },
  };
};
