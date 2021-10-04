import { Head } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      // ...
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-E2045P5WG5"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `  window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-E2045P5WG5'),{ page_path: window.location.pathname };`,
          }}
        />
      </Head>
    );
  }
}
