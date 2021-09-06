import { DefaultSeo } from 'next-seo';
import { useState, useRef, useEffect } from 'react';
import Carousel from '../components/UI/Carousel';
import { useQuery } from '@apollo/client';
import { homeQuery } from './../constant/page';
import parser from 'react-html-parser';
import Head from 'next/head';
import styles from './styles.module.scss';
import { GetStaticProps } from 'next';
import CardProject from './../components/UI/CardProject';
import { FaAngleDoubleRight, FaAngleDoubleDown } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function Home({ yoastSeo }) {
  const [name, setName] = useState('');
  const [show, setShow] = useState(false); //show input
  const formRef = useRef<HTMLTextAreaElement>(null);
  const headerSeo = parser(yoastSeo);
  const router = useRouter();
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
  useEffect(() => {
    Aos.init({ duration: 1200, delay: 100 });
  }, []);
  return (
    <div>
      <Head>{headerSeo}</Head>
      <div className="p-0">
        <div
          className={`col-md-12 mb-3 ${styles.home_bg}`}
          style={{
            maxWidth: '100%',
            backgroundColor: '#f9f9f9',
            backgroundImage:
              'url(http://d9hhrg4mnvzow.cloudfront.net/unbouncepages.com/courses-ed/1kb2ged-img-slider-01-1_11hc0qi00000000000001o.jpg)',
          }}
        >
          <div data-aos="fade-up" className={styles.home_content}>
            <h1 style={{ textAlign: 'center' }}>
              Welcome to <a href="">Personal Branding</a>
            </h1>
            <div className={styles.btnGroup}>
              <button
                className={styles.btn}
                onClick={() => {
                  router.push('/blog');
                }}
              >
                Discover
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className="row" data-aos="fade-zoom-in">
          <div className="col-12">
            <h2 style={{ textAlign: 'center', color: 'rgb(0 0 0/75%)' }}>
              Tell us your story
            </h2>
            <form onSubmit={submitForm} className={styles.form}>
              <textarea
                value={name}
                onChange={(e) => setName(e.target.value)}
                ref={formRef}
                placeholder="Describe yourself here..."
              />
              <button
                className="btn"
                type="submit"
                style={{ display: 'block', margin: '0 auto' }}
              >
                Submit
              </button>
              <div
                className={`${
                  show
                    ? `${styles.form_layer} ${styles.active}`
                    : `${styles.form_layer} ${styles.deactive}`
                }`}
              />
              <button
                className={` ${styles.btn}`}
                onClick={() => {
                  formRef?.current.focus();
                  setShow((prevState) => !prevState);
                }}
              >
                {show ? (
                  'Close'
                ) : (
                  <>
                    <FaAngleDoubleDown />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="row" data-aos="fade-zoom-in">
          <div
            className={`col-md-12 ${styles.head_title}`}
            style={{ zIndex: 2 }}
          >
            <h3 data-aos="fade-zoom-in" className={styles.title}>
              For Watching
            </h3>
            <span data-aos="fade-zoom-in">
              Go ahead
              <FaAngleDoubleRight />
            </span>
          </div>
          <div data-aos="fade-zoom-in">
            <Carousel item={null} column={3} />
          </div>
        </div>

        <div className="row" data-aos="fade-zoom-in">
          <div className={`col-md-12 ${styles.head_title}`}>
            <h3 data-aos="fade-zoom-in" className={styles.title}>
              For Reading
            </h3>
            <span data-aos="fade-zoom-in">
              Go ahead
              <FaAngleDoubleRight />
            </span>
          </div>

          <div data-aos="fade-zoom-in">
            <Carousel item={null} column={4} />
          </div>
        </div>

        <div className="row" data-aos="fade-zoom-in">
          <div className={`col-md-12 mb-4 ${styles.head_title}`}>
            <h3 className={styles.title}>Project/Programs</h3>
            <span>
              Go ahead
              <FaAngleDoubleRight />
            </span>
          </div>

          <div className="col-md-3 mb-3" data-aos="zoom-out">
            <CardProject
              img={
                'https://cdn.dribbble.com/users/746931/screenshots/11132148/media/9777b75b94f416aff7f3f7e299adbb52.png?compress=1&resize=400x300'
              }
            />
          </div>
          <div className="col-md-3 mb-3" data-aos="zoom-out">
            <CardProject
              img={
                'https://i.pinimg.com/originals/d5/38/92/d53892ca116775c2c3ce77bd4c2d8cc9.jpg'
              }
            />
          </div>
          <div className="col-md-3 mb-3" data-aos="zoom-out">
            <CardProject
              img={
                'https://cdn.dribbble.com/users/610636/screenshots/11430667/artboard___4_2x_4x.jpg'
              }
            />
          </div>
          <div className="col-md-3 mb-3" data-aos="zoom-out">
            <CardProject
              img={
                'https://cdn.dribbble.com/users/1820876/screenshots/6201423/preview.jpg'
              }
            />
          </div>
          <div className="col-md-3 mb-3" data-aos="zoom-out">
            <CardProject
              img={
                'https://i.pinimg.com/originals/81/6f/e2/816fe20323ab2275bd3567cdec8f936f.png'
              }
            />
          </div>
          <div className="col-md-3 mb-3" data-aos="zoom-out">
            <CardProject
              img={
                'https://cdn.dribbble.com/users/3325754/screenshots/11289182/figo_-_dribble_cover_4x.png'
              }
            />
          </div>
          <div className="col-md-3 mb-3" data-aos="zoom-out">
            <CardProject
              img={
                'https://assets.materialup.com/uploads/0401769b-2a67-414d-82a4-07477811340b/preview.png'
              }
            />
          </div>
          <div className="col-md-3 mb-3" data-aos="zoom-out">
            <CardProject
              img={
                'https://cdn.dribbble.com/users/3235024/screenshots/15755387/media/fec1f523f4ac53b8b86cd9e6a21654be.png?compress=1&resize=400x300'
              }
            />
          </div>
        </div>

        <div className="row" data-aos="fade-zoom-in">
          <div className={`col-md-12 mb-4 ${styles.head_title}`}>
            <h3 className={styles.title}>English Preference</h3>
            <span>
              Go ahead
              <FaAngleDoubleRight />
            </span>
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
