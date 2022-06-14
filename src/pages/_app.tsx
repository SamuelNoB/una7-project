import { SessionProvider } from "next-auth/react"
import type { ReactElement, ReactNode } from 'react'
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { registerLicense } from '@syncfusion/ej2-base';

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import isLeapYear from 'dayjs/plugin/isLeapYear' // import plugin
import 'dayjs/locale/pt-br' // load on demand

import 'react-toastify/dist/ReactToastify.css';
import '../styles/helper.scss';
import '../styles/index.scss';
import '../styles/post.scss'
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';


dayjs.locale('pt-br')
dayjs.extend(localizedFormat)
dayjs.extend(isLeapYear) // use plugin

import Auth from "../components/auth";
const syncFusionKey = process.env.NEXT_PUBLIC_SYNCFUSION_KEY ?? '';
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode,
  auth?: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  registerLicense(syncFusionKey)
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page) => page)
  return (
  <QueryClientProvider client={queryClient}>
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          {getLayout(<Component {...pageProps} />)}
        </Auth>
      ) :
      (getLayout(<Component {...pageProps} />))
      }
      <ReactQueryDevtools initialIsOpen={false} />
    </SessionProvider>
  </QueryClientProvider>
  )
}

export default MyApp
