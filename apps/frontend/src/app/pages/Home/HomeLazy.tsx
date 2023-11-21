import React, { lazy } from 'react';

const Home = lazy(() => import(/* webpackChunkName: "home" */ './Home'));

export const HomeLazy = () => <Home />;
