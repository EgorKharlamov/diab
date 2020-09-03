import React from 'react';
import withAuth from '../components/HOC/withAuth';
import Layout from '../components/Layout';

const Profile = () => (

  <>
    <Layout>
      <h1>PROFILE</h1>
    </Layout>

  </>
);

export default withAuth(Profile);
