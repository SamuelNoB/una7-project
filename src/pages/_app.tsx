import { SessionProvider } from "next-auth/react"
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import '../styles/helper.scss';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Auth from "../components/auth";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode,
  auth?: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
  <SessionProvider session={session}>
    {Component.auth ? (
      <Auth>
        {getLayout(<Component {...pageProps} />)}
      </Auth>
    ) :
    (getLayout(<Component {...pageProps} />))
    }
  </SessionProvider>)
}

export default MyApp
