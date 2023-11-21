import React, { lazy } from 'react';

const SignIn = lazy(() => import(/* webpackChunkName: "log-in" */ './LogIn'));

export const LogInLazy = () => <SignIn />;
