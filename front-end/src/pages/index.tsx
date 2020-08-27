import React from 'react';
import NextLink from 'next/link';
import s from '../styles/Home.module.sass';

export default function Home() {
  return (
    <>
      <h1 className={`${s.h1} bold`}>
        Hi there!
      </h1>

      <NextLink href="/login">
        <a>to login page</a>
      </NextLink>
    </>
  );
}
