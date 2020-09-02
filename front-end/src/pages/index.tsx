import React from 'react';
import { useSelector } from 'react-redux';
import { withTranslation } from '../../i18n';
import s from '../styles/Home.module.sass';
import { iState } from '../store';
import Layout from '../components/Layout';

const Home = ({ t }:any) => {
  const user = useSelector<iState, iState['user']>((state) => state.user);

  const name = user.login.valueShowed || 'Guest';
  return (
    <Layout>
      <h1 className={`${s.h1} bold`}>
        {name === 'Guest'
          ? t('helloGuest')
          : t('helloUser', { name })}
      </h1>

    </Layout>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation(['common'])(Home);
