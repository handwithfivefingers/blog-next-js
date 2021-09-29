import { useState, useRef, useEffect } from 'react';
import Carousel from '../components/UI/Carousel';
import { useQuery } from '@apollo/client';
import { homeQuery } from './../constant/page';
import parser from 'react-html-parser';
import Head from 'next/head';
import styles from './styles.module.scss';
import CardProject from './../components/UI/CardProject';
import { FaAngleDoubleRight, FaAngleDoubleDown } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import { useAppSelector } from '../redux/store/hook';

const Readmore = ({ title, link }) => {
  return (
    <div className={`col-md-12 ${styles.head_title}`} style={{ zIndex: 2 }}>
      <h3 data-aos="fade-zoom-in" className={styles.title}>
        {title}
      </h3>
      <Link href={link} data-aos="fade-zoom-in">
        <span>
          Xem tất cả
          <FaAngleDoubleRight />
        </span>
      </Link>
    </div>
  );
};

export default function Home({ page }) {
  const [name, setName] = useState('');
  const [show, setShow] = useState(false); //show input
  const formRef = useRef<HTMLTextAreaElement>(null);
  const [modal, setModal] = useState('');
  // const headerSeo = parser(yoastSeo);
  const section = page.frontpage;
  // console.log(page);
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
  const state = useAppSelector((state) => state.ModalReducer);
  // console.log(state);
  useEffect(() => {
    Aos.init({ duration: 600, offset: -100 });
  }, []);
  // Section 1
  const renderHomeBG = () => {
    let xhtml = null;
    xhtml = (
      <div className="p-0">
        <div
          className={`col-md-12 mb-3 ${styles.home_bg}`}
          style={{
            maxWidth: '100%',
            backgroundColor: '#f9f9f9',
            backgroundImage: `url(${section.section1.section1Image.sourceUrl})`,
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
    );
    return xhtml;
  };
  //Section 2
  const renderSection2 = () => {
    let xhtml = null;
    let section2 = section?.section2;
    let item =
      section2.section2Carousel === 'By Link'
        ? section2.section2Linkid
        : section2.section2Carousel === 'By Post'
        ? section2.section2.section2Post
        : null;
    xhtml = (
      <div className="row" data-aos="fade-zoom-in">
        <Readmore title="For Watching" link="" />
        <div data-aos="fade-zoom-in">
          <Carousel item={item} type="link" column={3} />
        </div>
      </div>
    );
    return xhtml;
  };
  //Section 3
  const renderSection3 = () => {
    let xhtml = null;
    let section3 = section?.section3;
    xhtml = (
      <div className="row" data-aos="fade-zoom-in">
        <Readmore
          title="For Reading"
          link={
            section3.section3LinkForward ? section3.section3LinkForward : ''
          }
        />
        <div data-aos="fade-zoom-in">
          <Carousel item={section3.section3Slider} column={4} />
        </div>
      </div>
    );
    return xhtml;
  };

  return (
    <div data-aos="fade-zoom-in">
      <Head>{parser(page?.seo.fullHead)}</Head>
      {section.section1 ? renderHomeBG() : ''}
      <div className={styles.wrapper}>
        {/** Form Section */}
        <div className="row" data-aos="fade-zoom-in">
          <div className="col-12">
            <h2
              className={styles.title}
              style={{ textAlign: 'center', color: 'rgb(0 0 0/75%)' }}
            >
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
        {/**
         * Section 2
         */}
        {section.section2 ? renderSection2() : ''}
        {/**
         * Section 3
         */}
        {section.section3 ? renderSection3() : ''}

        <div
          className="row"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-out-quart"
        >
          <Readmore title="Project/ Programs" link="" />
          <div
            className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3"
            data-aos="zoom-in"
          >
            <CardProject
              img={
                'https://cdn.dribbble.com/users/746931/screenshots/11132148/media/9777b75b94f416aff7f3f7e299adbb52.png?compress=1&resize=400x300'
              }
            />
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3"
            data-aos="zoom-in"
          >
            <CardProject
              img={
                'https://i.pinimg.com/originals/d5/38/92/d53892ca116775c2c3ce77bd4c2d8cc9.jpg'
              }
            />
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3"
            data-aos="zoom-in"
          >
            <CardProject
              img={
                'https://cdn.dribbble.com/users/610636/screenshots/11430667/artboard___4_2x_4x.jpg'
              }
            />
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3"
            data-aos="zoom-in"
          >
            <CardProject
              img={
                'https://cdn.dribbble.com/users/1820876/screenshots/6201423/preview.jpg'
              }
            />
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3"
            data-aos="zoom-in"
          >
            <CardProject
              img={
                'https://i.pinimg.com/originals/81/6f/e2/816fe20323ab2275bd3567cdec8f936f.png'
              }
            />
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3"
            data-aos="zoom-in"
          >
            <CardProject
              img={
                'https://cdn.dribbble.com/users/3325754/screenshots/11289182/figo_-_dribble_cover_4x.png'
              }
            />
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3"
            data-aos="zoom-in"
          >
            <CardProject
              img={
                'https://assets.materialup.com/uploads/0401769b-2a67-414d-82a4-07477811340b/preview.png'
              }
            />
          </div>
          <div
            className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3"
            data-aos="zoom-in"
          >
            <CardProject
              img={
                'https://cdn.dribbble.com/users/3235024/screenshots/15755387/media/fec1f523f4ac53b8b86cd9e6a21654be.png?compress=1&resize=400x300'
              }
            />
          </div>
        </div>

        <div className="row" data-aos="fade-zoom-in">
          <Readmore title="English Preference" link="" />
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
      </div>
    </div>
  );
}

export const getStaticProps = async (context) => {
  const { data } = await homeQuery;
  return {
    props: {
      page: data.page,
    },
  };
};
