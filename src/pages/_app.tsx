import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import '../styles/global.css'
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} />
      </AuthProvider>
    </>
  )
}