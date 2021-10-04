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
import * as gtag from '../helper/Gtag';
const isProduction = process.env.NODE_ENV === 'production';

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
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <UserProvider
          value={{ rowLayout, SetRow: () => setRowLayout(!rowLayout) }}
        >
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
