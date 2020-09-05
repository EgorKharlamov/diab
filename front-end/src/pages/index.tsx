import React from 'react';
import Layout from '../components/Layout';
import { withTranslation } from '../../i18n';

const Home = () => (
  <Layout>
    <h1>
      Home page
    </h1>

  </Layout>
);

Home.getInitialProps = async () => ({
  namespacesRequired: ['common', 'inputs', 'buttons', 'links'],
});

export default withTranslation(['common', 'inputs', 'buttons', 'links'])(Home);
