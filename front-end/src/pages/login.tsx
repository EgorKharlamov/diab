import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from '../styles/UI/Home.module.sass';
import { UserActions } from '../store/user/actions';
import Layout from '../components/Layout';
import Input from '../components/UI/Input';
import { withTranslation } from '../../i18n';

const Login = ({ t }:any) => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const onClickHandlerSignUp = async () => {
    dispatch(UserActions.signUp({ login, email, pass }));
  };

  const onClickHandlerSignIn = async () => {
    dispatch(UserActions.signIn({ entry: login, pass }));
  };

  const onClickHandlerLogOut = async () => {
    dispatch(UserActions.logOut());
  };

  return (
    <Layout>

      <h1 className={`${s.h1} bold`}>
        Login page!
      </h1>

      <form>
        <Input value={login} label={t('enterLogin')} name="login" onChangeInput={setLogin} />
        <Input value={pass} label={t('enterPass')} name="pass" onChangeInput={setPass} type="password" />
        <Input value={email} label={t('enterEmail')} name="email" onChangeInput={setEmail} type="email" />

        <button type="button" onClick={onClickHandlerSignIn}>{t('buttons:signIn')}</button>
        <button type="button" onClick={onClickHandlerSignUp}>{t('buttons:signUp')}</button>
        <button type="button" onClick={onClickHandlerLogOut}>{t('buttons:logOut')}</button>
      </form>

    </Layout>

  );
};
Login.getInitialProps = async () => ({
  namespacesRequired: ['inputs', 'buttons'],
});

export default withTranslation(['inputs', 'buttons'])(Login);
