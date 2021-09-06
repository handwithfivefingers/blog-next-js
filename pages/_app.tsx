import '../assets/css/style.scss';
import '../assets/css/grid.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import ApolloClient from 'apollo-boost';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ApolloProvider } from 'react-apollo';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import client from '../apollo-client';
import { useRouter } from 'next/router';
const noOverlayWorkaroundScript = `
  window.addEventListener('error', event => {
    event.stopImmediatePropagation()
  })

  window.addEventListener('unhandledrejection', event => {
    event.stopImmediatePropagation()
  })
`;

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Head>
        {process.env.NODE_ENV !== 'production' && (
          <script
            dangerouslySetInnerHTML={{ __html: noOverlayWorkaroundScript }}
          />
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="google-site-verification"
          content="tLgd15lMPuUM4Hhrq4nHs7ml7Xx8sntwYH0RjUJSq2k"
        />
      </Head>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://truyenmai.com',
          site_name: 'Truyền Mai',
        }}
        canonical="https://truyenmai.com"
        description="Chia sẻ thông tin về html, css, javascript"
        defaultTitle="Truyền Mai Blog"
      />
      <div className="container-fluid" style={{ padding: 0 }}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default MyApp;
