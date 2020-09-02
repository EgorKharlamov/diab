import '../styles/globals.sass';
import React, { FC } from 'react';
import type { AppContext, AppProps } from 'next/app';
import { wrapper } from '../store';
import requester from '../helpers/requester';
import { signIn } from '../types/user';
import { UserActions } from '../store/user/actions';
import redirect from '../helpers/redirect';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

// @ts-ignore
// eslint-disable-next-line no-unused-vars
WrappedApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const protectedRoutes = {
    profile: 'profile',
  };
  // try to set user when app init
  const state = ctx.store.getState();
  if (state.user.isLoggedIn === signIn.empty) {
    const user = await requester.whoAmI(ctx);
    if (user.data && user.data.me && user.data.me.user) {
      ctx.store.dispatch(UserActions.setUser({ ...user.data.me.user, isLoggedIn: signIn.succeed }));
    } else {
      ctx.store.dispatch(UserActions.clearUser());
      // redirect unauth users to login page
      redirect(ctx.res, '/login', protectedRoutes, ctx.pathname);
    }
  }

  return {
    props: {
      pageProps: {

        appProp: ctx.pathname,
      },
    },
  };
};
export default wrapper.withRedux(WrappedApp);
