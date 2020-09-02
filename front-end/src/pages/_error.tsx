import React from 'react';
import { withTranslation } from '../../i18n';

const Error = ({ statusCode, t }:any) => (
  <p>

    {statusCode
      ? t('error-with-status', { statusCode })
      : t('error-without-status')}
  </p>
);

Error.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Error);
