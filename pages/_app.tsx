import '../assets/css/style.css';
import '../assets/css/grid.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}`,
  cache: new InMemoryCache(),
});
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Head>
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
