import Document, { Html, Head, Main, NextScript } from 'next/document';

import { GA_TRACKING_ID } from '../helper/Gtag';

const isProduction = process.env.NODE_ENV === 'production';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* enable analytics script only for production */}
          {isProduction && (
            <>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1"
              />
              <link rel="shortcut icon" href="/favicon.ico" />
              <meta
                name="google-site-verification"
                content="tLgd15lMPuUM4Hhrq4nHs7ml7Xx8sntwYH0RjUJSq2k"
              />
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
