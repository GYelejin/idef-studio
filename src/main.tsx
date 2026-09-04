import React from 'react';
import ReactDOM from 'react-dom/client';
// ClojureScript UIX 2 Application Component:
import { App } from '@cljs-out/main.js';
import './index.css';

import { store } from './core/store';

(window as any).store = store;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
