import React from "react";
import '../../styles/globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  )
}

export default MyApp
