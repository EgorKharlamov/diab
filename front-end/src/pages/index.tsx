import React from 'react';
import NextLink from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { i18n, Link, withTranslation } from '../../i18n';
import s from '../styles/Home.module.sass';
import { iState } from '../store';

const Home = ({ t }:any) => {
  const user = useSelector<iState, iState['user']>((state) => state.user);
  const dispatch = useDispatch();

  const name = user.login.valueShowed || 'Guest';

  return (
    <>
      <h1 className={`${s.h1} bold`}>
        {name === 'Guest'
          ? t('helloGuest')
          : t('helloUser', { name })}
      </h1>

      <NextLink href="/login">
        <a>to login page</a>
      </NextLink>
      <br />
      <NextLink href="/profile">
        <a>to profile</a>
      </NextLink>
    </>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Home);
