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
      const createUser = await requester.createUser({ login, email, pass });
      console.log(createUser);
    } catch (e) { return null; }
    return null;
  };

  const onClickHandlerSignIn = async () => {
    try {
      const logIn = await requester.authUser({ entry: login, pass });
      console.log(logIn);
    } catch (e) { return null; }
    return null;
  };

  const onClickHandlerLogOut = async () => {
    try {
      const logOut = await requester.logOutUser();
      console.log(logOut);
    } catch (e) { return null; }
    return null;
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
        <button type="button" onClick={onClickHandlerLogOut}>Log out!</button>
      </form>

    </>

  );
}
