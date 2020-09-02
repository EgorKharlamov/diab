import '../styles/globals.sass';
import React, { FC } from 'react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { wrapper } from '../store';
import requester from '../helpers/requester';
import { signIn } from '../types/user';
import { UserActions } from '../store/user/actions';
import redirect from '../helpers/redirect';
import { appWithTranslation } from '../../i18n';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

// @ts-ignore
// eslint-disable-next-line no-unused-vars
WrappedApp.getInitialProps = async (appContext: AppContext) => {
  const protectedRoutes = {
    profile: 'profile',
  };
  // try to set user when app init
  const state = appContext.ctx.store.getState();
  if (state.user.isLoggedIn === signIn.empty) {
    const user = await requester.whoAmI(appContext.ctx);
    if (user.data && user.data.me && user.data.me.user) {
      appContext.ctx.store.dispatch(UserActions.setUser(
        { ...user.data.me.user, isLoggedIn: signIn.succeed },
      ));
    } else {
      appContext.ctx.store.dispatch(UserActions.clearUser());
      // redirect unauth users to login page
      redirect(appContext.ctx.res, '/login', protectedRoutes, appContext.ctx.pathname);
    }
  }

  return { ...await App.getInitialProps(appContext) };
};
export default wrapper.withRedux(appWithTranslation(WrappedApp));
