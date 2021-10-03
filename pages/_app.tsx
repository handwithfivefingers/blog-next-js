import '../assets/css/style.scss';
import '../assets/css/grid.css';
import '../assets/css/wpblock.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import client from '../apollo-client';
import TransitionLayout from '../components/Transition';
import Router, { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Loading from './../components/Loading';
import ModalVideos from '../components/UI/ModalVideo';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { UserProvider } from '../helper/Context';
function MyApp({ Component, pageProps }) {
  const [loading, SetLoading] = useState(false);
  const [rowLayout, setRowLayout] = useState(false);
  const router = useRouter();
  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      SetLoading(true);
      document.getElementsByTagName('body')[0].classList.add('disabled-scroll');
    });
    Router.events.on('routeChangeComplete', (url) => {
      SetLoading(false);
      document
        .getElementsByTagName('body')[0]
        .classList.remove('disabled-scroll');
    });
  }, []);
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <UserProvider
          value={{ rowLayout, SetRow: () => setRowLayout(!rowLayout) }}
        >
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1"
            />
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta
              name="google-site-verification"
              content="tLgd15lMPuUM4Hhrq4nHs7ml7Xx8sntwYH0RjUJSq2k"
            />
          </Head>
          <div className="container-fluid" style={{ padding: 0 }}>
            <Header loading={loading} />
            {(loading && <Loading active={loading} />) || (
              <Component {...pageProps} />
            )}
            <ModalVideos />
            <Footer />
          </div>
        </UserProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
