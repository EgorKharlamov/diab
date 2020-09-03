import React from 'react';
import s from '../styles/UI/Home.module.sass';
import Layout from '../components/Layout';
import { withTranslation } from '../../i18n';

const Home = () => (
  <Layout>
    <h1 className={`${s.h1} bold`}>
      Home page
    </h1>

  </Layout>
);

Home.getInitialProps = async () => ({
  namespacesRequired: ['common', 'inputs', 'buttons', 'links'],
});

export default withTranslation(['common', 'inputs', 'buttons', 'links'])(Home);
