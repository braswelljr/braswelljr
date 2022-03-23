import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import AppLayout from '@/layout/AppLayout'

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <Head>
        <title>Braswell Jr</title>
        <link rel="preload" as="font" href="/fonts/JetBrainsMono[wght].ttf" />
        <link
          rel="preload"
          as="font"
          href="/fonts/JetBrainsMono-Italic[wght].ttf"
        />
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
