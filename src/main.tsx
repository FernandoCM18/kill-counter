import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import './index.css';

import { apollo } from './lib/apollo';
import { ThemeProviderCustom } from './context/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <BrowserRouter>
    <ThemeProviderCustom>
      <HelmetProvider>
          <ApolloProvider client={apollo}>
            <App />
          </ApolloProvider>
      </HelmetProvider>
    </ThemeProviderCustom>
    </BrowserRouter>
  // </React.StrictMode>
)
