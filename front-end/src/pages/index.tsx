import React from 'react';
import NextLink from 'next/link';
import s from '../styles/Home.module.sass';
import requester from '../helpers/requester';

export default function Home({ user }:any) {
  // const [];

  const handlerOnClickGetMe = async () => {
    try {
      const res = await requester.whoAmI();
      console.log(res);
    } catch (e) {}
  };
  return (
    <>
      <h1 className={`${s.h1} bold`}>
        Hi there,
        {' '}
        { user }
        !
      </h1>

      <button type="button" onClick={handlerOnClickGetMe}>check me!</button>

      <NextLink href="/login">
        <a>to login page</a>
      </NextLink>
    </>
  );
}
