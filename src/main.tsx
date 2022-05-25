import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import './index.css';
import { themes } from './components/styles/ColorStyles';

import { apollo } from './lib/apollo';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider theme={themes}>
          <ApolloProvider client={apollo}>
            <App />
          </ApolloProvider>
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  // </React.StrictMode>
)
