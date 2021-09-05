import { DefaultSeo } from 'next-seo';
import { useState } from 'react';
import Carousel from '../components/UI/Carousel';
import { useQuery } from '@apollo/client';
import { homeQuery } from './../constant/page';
import parser from 'react-html-parser';
import Head from 'next/head';

import { GetStaticProps } from 'next';

export default function Home({ yoastSeo }) {
  const [name, setName] = useState('');
  const headerSeo = parser(yoastSeo);
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('entry.506450849', name);
    const res = fetch(
      'https://docs.google.com/forms/u/0/d/e/1FAIpQLSevkiBjcpkKBwUzWlop904kB8-asiQiHl3eQLlHx90gcCSFOw/formResponse',
      {
        method: 'POST',
        body: formData,
      },
    );
    res
      .then((res) => {})
      .catch((error) => {})
      .finally(() => {
        setName('');
      });
    // const data = await res.json();
    // console.log(data);
    // if (res.status === 200) {
    //   console.log(res);
    // } else {
    //   console.log('error');
    // }
  };
  return (
    <div>
      <Head>{yoastSeo}</Head>
      <div className="p-0">
        <div
          className="col-md-12 mb-3"
          style={{ maxWidth: '100%', height: 300, backgroundColor: '#f9f9f9' }}
        >
          <h1 style={{ textAlign: 'center' }}>
            Welcome to <a href="https://nextjs.org">Blog.js!</a>
          </h1>
        </div>
      </div>

      <div className="wrapper" style={{ padding: '25px 100px', margin: 0 }}>
        <div className="row">
          <div className="col-12">
            <h2 style={{ textAlign: 'center' }}>Tell us your story</h2>
            <form onSubmit={submitForm}>
              <textarea
                style={{ border: '1px solid red', height: 300, width: '100%' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button className="btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <Carousel item={null} column={4} />
        </div>

        <div className="row">
          <h3 style={{ fontSize: '16px' }}> For Watching</h3>
          <Carousel item={null} column={3} />
        </div>

        <div className="row">
          <h3 style={{ fontSize: '16px' }}>For Reading</h3>
          <Carousel item={null} column={4} />
        </div>

        <div className="row">
          <h3 style={{ fontSize: '16px' }}>Project/Programs</h3>
          <div className="col-md-3 mb-3">
            <div
              style={{
                width: '100%',
                height: 200,
                backgroundColor: '#f9f9f9',
              }}
            ></div>
          </div>
          <div className="col-md-3 mb-3">
            <div
              style={{
                width: '100%',
                height: 200,
                backgroundColor: '#f9f9f9',
              }}
            ></div>
          </div>
          <div className="col-md-3 mb-3">
            <div
              style={{
                width: '100%',
                height: 200,
                backgroundColor: '#f9f9f9',
              }}
            ></div>
          </div>
          <div className="col-md-3 mb-3">
            <div
              style={{
                width: '100%',
                height: 200,
                backgroundColor: '#f9f9f9',
              }}
            ></div>
          </div>
          <div className="col-md-3 mb-3">
            <div
              style={{
                width: '100%',
                height: 200,
                backgroundColor: '#f9f9f9',
              }}
            ></div>
          </div>
          <div className="col-md-3 mb-3">
            <div
              style={{
                width: '100%',
                height: 200,
                backgroundColor: '#f9f9f9',
              }}
            ></div>
          </div>
          <div className="col-md-3 mb-3">
            <div
              style={{
                width: '100%',
                height: 200,
                backgroundColor: '#f9f9f9',
              }}
            ></div>
          </div>
          <div className="col-md-3 mb-3">
            <div
              style={{
                width: '100%',
                height: 200,
                backgroundColor: '#f9f9f9',
              }}
            ></div>
          </div>
        </div>

        <div className="row">
          <h3 style={{ fontSize: '16px' }}>English Preference</h3>
          <div className="col-md-4 mb-3">
            <div
              style={{
                width: '100%',
                height: 200,
                backgroundColor: '#f9f9f9',
              }}
            ></div>
          </div>
          <div className="col-md-4 mb-3">
            <div
              style={{
                width: '100%',
                height: 200,
                backgroundColor: '#f9f9f9',
              }}
            ></div>
          </div>
          <div className="col-md-4 mb-3">
            <div
              style={{
                width: '100%',
                height: 200,
                backgroundColor: '#f9f9f9',
              }}
            ></div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-md-6">
            <h3>For Reading</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: `Let's be honest and cut through the marketing fluff. You need a
                website that looks amazing and actually works. The bottom line,
                that's what I do. And if you want to learn more about working
                with me, connect with me today.`,
              }}
            ></p>
            <button className="btn">Learn More</button>
          </div>
          <div className="col-md-6">
            <div
              style={{
                width: '100%',
                height: 300,
                backgroundColor: '#f9f9f9',
              }}
            ></div>
          </div>
        </div>
       */}
      </div>
    </div>
  );
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await homeQuery;
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { yoastSeo: data.page.seo.fullHead }, // will be passed to the page component as props
  };
};
