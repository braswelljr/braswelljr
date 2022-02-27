import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import AppLayout from '@/layout/AppLayout'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title key="title">@braswelljr</title>
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  )
}

export default App
