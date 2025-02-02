// index.js or App.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactModal from 'react-modal';
import StripeContext from './StripeContext';

// Set the app element for React Modal
ReactModal.setAppElement('#root');

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StripeContext>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <div className="max-w-screen-xl mx-auto">
              <RouterProvider router={router} />
            </div>
          </HelmetProvider>
        </QueryClientProvider>
      </AuthProvider>
    </StripeContext>
  </React.StrictMode>
);
