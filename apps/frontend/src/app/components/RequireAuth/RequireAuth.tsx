import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { AuthRepository } from '../../stores/auth-repository';
import { useStore } from '../../core/hooks/use-store';

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth = observer<RequireAuthProps>(({ children }) => {
  const authRepository = useStore(AuthRepository);
  const location = useLocation();

  if (!authRepository.hasAuth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they log in, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/log-in" state={{ from: location }} replace />;
  }
  return children;
});
