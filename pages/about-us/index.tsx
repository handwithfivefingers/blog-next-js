import React, { useState } from 'react';
import { aboutUsPage } from '../../constant/page';
import parser from 'react-html-parser';
import Head from 'next/head';
import Content from '../../components/Content';
import styles from './style.module.scss';
const About: React.FC = (props: any) => {
  const [name, setName] = useState('');
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
  };
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
            <div className="col-12">
              <h2
                style={{
                  textAlign: 'center',
                  color: 'rgb(0 0 0/75%)',
                  fontSize: '22px',
                }}
              >
                Tell us your story
              </h2>
              <form onSubmit={submitForm} className={styles.form}>
                <textarea
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // ref={formRef}
                  placeholder="Describe yourself here..."
                />
                <button
                  className="btn"
                  type="submit"
                  style={{ display: 'block', margin: '0 auto' }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        }
      />
    </>
  );
};

export default About;

export const getStaticProps = async (context) => {
  const { data } = await aboutUsPage;
  return {
    props: {
      data: data,
      revalidate: 60 * 60,
    },
  };
};
