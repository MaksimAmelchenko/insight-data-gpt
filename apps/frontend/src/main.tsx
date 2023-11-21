import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app/app';
import { createMainContext } from './app/core/main-context';
import { initializeMainStore } from './app/core/initialize-stores';

createMainContext(initializeMainStore());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
