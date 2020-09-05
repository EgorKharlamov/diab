import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FormSignIn from '../components/FormSignIn';
import FormSignUp from '../components/FormSignUp';
import Layout from '../components/Layout';
import { iLoginMode, loginMode } from '../types/auth';
import { withTranslation, Router } from '../../i18n';
import { iState } from '../store';
import { signIn } from '../types/user';

const Login = () => {
  const { isLoggedIn } = useSelector<iState, iState['user']>((state) => state.user);
  const [mode, setMode] = useState<string | iLoginMode>(loginMode.signIn);

  const changeMode = (modeVal:iLoginMode) => {
    setMode(modeVal);
  };
  useEffect(() => {
    if (isLoggedIn === signIn.succeed) {
      Router.push('/');
    }
  }, [isLoggedIn]);

  const renderForm = () => {
    if (mode === loginMode.signIn) {
      return <FormSignIn changeMode={changeMode} />;
    }
    if (mode === loginMode.signUp) {
      return <FormSignUp changeMode={changeMode} />;
    }
  };
  return (
    <>
      <Layout>
        {renderForm()}
      </Layout>
    </>
  );
};

Login.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation(['common'])(Login);
