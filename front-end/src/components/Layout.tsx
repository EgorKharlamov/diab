import React from 'react';
import Navbar from './Navbar';
import { i18n, withTranslation } from '../../i18n';

const Layout = ({ children, t }:any) => {
  const linksNav = [
    {
      id: 0,
      link: '/',
      name: t('links:home'),
    },
    {
      id: 1,
      link: '/profile',
      name: t('links:profile'),
    },
    {
      id: 2,
      link: '/login',
      name: t('links:login'),
    },
  ];
  return (
    <>
      <Navbar navPoints={linksNav} />
      <div>
        {children}
      </div>
    </>
  );
};
Layout.getInitialProps = async () => ({
  namespacesRequired: ['common', 'links', 'buttons'],
});

export default withTranslation(['common', 'links', 'buttons'])(Layout);
