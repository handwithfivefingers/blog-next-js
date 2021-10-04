import React from 'react';
import { getSinglePage, Pages } from '../../constant/page';
// import { contactPage } from '../../constant/page';
import parser from 'react-html-parser';
import Head from 'next/head';
import Content from '../../components/Content';
const Contact = (props) => {
  return (
    <>
      <Head>{parser(props?.data.page.seo.fullHead)}</Head>
      <Content
        singlePost
        title={'Contact'}
        content={
          <div className="row" style={{ margin: 0 }}>
            <h2>Contact</h2>
            {parser(props?.data.page.content)}
          </div>
        }
      />
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
