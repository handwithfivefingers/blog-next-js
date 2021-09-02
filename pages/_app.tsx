import '../assets/css/style.css';
import '../assets/css/grid.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({ uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}` });

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <div className="container-fluid" style={{ padding: 0 }}>
        <Header />
        <div className="container" style={{ position: 'relative' }}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default MyApp;
