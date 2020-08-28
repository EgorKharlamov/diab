import React, { useState } from 'react';
import NextLink from 'next/link';
import s from '../styles/Home.module.sass';
import requester from '../helpers/requester';

export default function Login() {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');

  const onChangeLoginHandler = (val: React.FormEvent<HTMLInputElement>) => {
    setLogin(val.currentTarget.value);
  };

  const onChangePassHandler = (val: React.FormEvent<HTMLInputElement>) => {
    setPass(val.currentTarget.value);
  };

  const onChangeEmailHandler = (val: React.FormEvent<HTMLInputElement>) => {
    setEmail(val.currentTarget.value);
  };

  const onClickHandlerSignUp = async () => {
    try {
      const createUser = await requester(`mutation{ createUser(login:"${login}" pass:"${pass}" email:"${email}")}`);
      console.log(createUser);
    } catch (e) {}
  };

  const onClickHandlerSignIn = async () => {
    try {
      const logIn = await requester(`mutation{ authUser(entry:"${login}" pass:"${pass}")}`);
      console.log(logIn);
    } catch (e) {}
  };

  return (
    <>

      <h1 className={`${s.h1} bold`}>
        Login page!
      </h1>
      <NextLink href="/"><a>Home</a></NextLink>

      <form>
        <label htmlFor="login">
          <input type="text" name="login" id="login" onChange={onChangeLoginHandler} />
        </label>

        <label htmlFor="pass">
          <input type="password" name="pass" id="pass" onChange={onChangePassHandler} />
        </label>

        <label htmlFor="email">
          <input type="email" name="email" id="email" onChange={onChangeEmailHandler} />
        </label>

        <button type="button" onClick={onClickHandlerSignIn}>Sign in!</button>
        <button type="button" onClick={onClickHandlerSignUp}>Sign up!</button>
      </form>

    </>

  );
}
