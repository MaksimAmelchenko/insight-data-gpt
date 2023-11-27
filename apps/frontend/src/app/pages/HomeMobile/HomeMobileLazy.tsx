import React, { lazy } from 'react';

const HomeMobile = lazy(() => import(/* webpackChunkName: "home-mobile" */ './HomeMobile'));

export const HomeMobileLazy = () => <HomeMobile />;
