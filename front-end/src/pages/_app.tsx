import '../styles/globals.sass';
import React from 'react';
import type { AppProps /* , AppContext */ } from 'next/app';
import requester from '../helpers/requester';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async ({ ctx }:any) => {
  let whoAmI = await requester.whoAmI(ctx);
  whoAmI = whoAmI.data ? whoAmI.data.me.login.login : whoAmI.errors[0].message;
  return {
    pageProps: {
      user: whoAmI,
    },
  };
};

export default MyApp;
