import React from 'react';
import NextLink from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import s from '../styles/Home.module.sass';
import { iState } from '../store';

const Home = () => {
  const user = useSelector<iState, iState['user']>((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <h1 className={`${s.h1} bold`}>
        Hi there,
        {' '}
        {user.login.valueShowed || 'Guest'}
        !
      </h1>

      <NextLink href="/login">
        <a>to login page</a>
      </NextLink>
      <br />
      <NextLink href="/profile">
        <a>to profile</a>
      </NextLink>
    </>
  );
};
export default Home;
