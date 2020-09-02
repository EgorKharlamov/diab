import React from 'react';
import NextLink from 'next/link';
import withAuth from '../components/withAuth';

const Profile = () => (

  <>
    <h1>PROFILE</h1>
    <NextLink href="/">
      <a>to home page</a>
    </NextLink>
  </>
);

export default withAuth(Profile);
