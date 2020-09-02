import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { iState } from '../store';
import { signIn } from '../types/user';

const withAuth = (C: React.FunctionComponent) => function AuthComponent(props:any) {
  const router = useRouter();
  const isLoggedIn = useSelector<iState, iState['user']['isLoggedIn']>((state) => state.user.isLoggedIn);
  if (isLoggedIn !== signIn.succeed) {
    router.push('/login');
    return <h1>hehe</h1>;
  }
  return <C {...props} />;
};

export default withAuth;
