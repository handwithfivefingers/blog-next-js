import React, { useState } from 'react';
import { getSinglePage, Pages } from '../../constant/page';
import parser from 'react-html-parser';
import Head from 'next/head';
import Content from '../../components/Content';
import style from './style.module.scss';
import emailjs from 'emailjs-com';
const Contact = (props) => {
  const [done, setDone] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    let input = e.target.querySelectorAll('input');
    for (let inp of input) {
      if (inp.value.length <= 1) {
        return;
      }
      if (inp.name === 'phone') {
        if (inp.value.length <= 5) {
          return;
        }
      }
    }
    emailjs
      .sendForm(
        'email_truyenmaiblog',
        'template_uanusgb',
        e.target,
        'user_KMOFfk2s3H8Q3yRiCYwGH',
      )
      .then((res) => setDone(true))
      .catch((err) => console.log(err.repsonse))
      .finally(() => {
        setDone(true);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      });
  };

  const mailSend = (form) => {};
  return (
    <>
      <Head>{parser(props?.data.page.seo.fullHead)}</Head>
      <Content
        singlePost
        title={'Contact'}
        content={
          <div className="row" style={{ margin: 0 }}>
            <h2>Contact</h2>
            {done ? (
              <p>Cảm ơn bạn, chúng tôi sẽ phản hồi lại sớm nhất</p>
            ) : (
              <form onSubmit={handleSubmit} className={style.form_control}>
                <h3>Contact Us </h3>
                <div className={style.form_item}>
                  <input
                    placeholder="Họ và Tên:"
                    type="text"
                    name="name"
                    required
                  />
                  <span></span>
                </div>
                <div className={style.form_item}>
                  <input
                    placeholder="Số Điện Thoại:"
                    type="text"
                    name="phone"
                    required
                  />
                  <span></span>
                </div>
                <div className={style.form_item}>
                  <input
                    placeholder="Email Liên Lạc:"
                    type="email"
                    name="email"
                    required
                  />
                  <span></span>
                </div>
                <div className={style.form_item}>
                  <textarea placeholder="Lời nhắn gửi đến:" name="message" />
                  <span></span>
                </div>
                <button type="submit" className={`${style.btn} btn`}>
                  Gửi
                </button>
              </form>
            )}
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
      revalidate: 60 * 60,
    },
  };
};
