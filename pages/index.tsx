import Head from 'next/head';
import Footer from '../components/Footer';
// import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import Button from '../components/UI/Button';
import Image from 'next/image';
export default function Home() {
  return (
    <div>
      <Head>
        <title>Blog js</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container-fluid p-0">
        <div
          className="col-md-12 mb-3"
          style={{ maxWidth: '100%', height: 300, backgroundColor: '#f9f9f9' }}
        >
          <h1 style={{ textAlign: 'center' }}>
            Welcome to <a href="https://nextjs.org">Blog.js!</a>
          </h1>
        </div>
      </div>
      <div className="container">
        <div className="row" style={{ padding: '25px 100px' }}>
          <div className="col-md-12 p-0">
            <div className="row">
              <div className="col-md-6">
                <h3>About me</h3>
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
            <div className="row">
              <h3>Our Project</h3>
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
          </div>
        </div>
      </div>
    </div>
  );
}
