import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { observer } from 'mobx-react-lite';

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
// import { Loader } from './components/Loader/Loader';
import { MainLayoutLazy } from './containers/MainLayout/MainLayoutLazy';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { LogInLazy } from './pages/LogIn/LogInLazy';
import { SnackbarUtilsConfigurator } from './components/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { useDeviceSize } from './lib/use-device-size';

export const App = observer(() => {
  const { isSmall } = useDeviceSize();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={3000}
      >
        <SnackbarUtilsConfigurator />
        <ErrorBoundary>
          <Routes>
            <Route path="/log-in" element={<LogInLazy />} />
            <Route
              path="*"
              element={<RequireAuth>{isSmall ? <div>mobile not implemented</div> : <MainLayoutLazy />}</RequireAuth>}
            />
          </Routes>
        </ErrorBoundary>
      </SnackbarProvider>
    </Suspense>
  );
});
