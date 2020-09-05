import React from 'react';
import { withTranslation } from '../../i18n';
import Header from './Header/Header';

const Layout = ({ children, t }: any) => {
  const kek = 'kek';
  return (
    <>
      <Header />
      {children}
    </>
  );
};
Layout.getInitialProps = async () => ({
  namespacesRequired: ['inputs', 'buttons'],
});

export default withTranslation(['inputs', 'buttons'])(Layout);
