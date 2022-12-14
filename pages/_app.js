/* eslint-disable react/jsx-props-no-spreading */
import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';
// TODO: Swap with our own progress bar
// import 'nprogress/nprogress.css';
import '../components/styles/nprogress.css';
import { ApolloProvider } from '@apollo/client';
import { renderToStringWithData } from '@apollo/react-ssr';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// when we export our application we wrap with withData function that gives us access to apollo client
function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  // if any of the pages have getInitialProps we will wait and go and fetch the data
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // this exposes the query to the user
  pageProps.query = ctx.query;
  return { pageProps };
};

// inject apollo client into our application
export default withData(MyApp);
