import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import AppLayout from '@/layout/AppLayout'

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <Head>
        <title key="title" className="">
          {router.pathname.split('/')[1] === undefined
            ? '@braswelljr'
            : `@braswelljr - ${router.pathname.split('/')[1].toUpperCase()}`}
        </title>
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  )
}

export default App
