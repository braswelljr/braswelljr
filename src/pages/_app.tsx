import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import clsx from 'clsx'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="braswelljr" content="Braswell Kenneth Personal portfolio" />
        <meta name="keywords" content="Keywords" />
        <title key="title">@braswelljr</title>

        <meta key="twitter:title" name="twitter:title" content="brakez ken" />
        <meta
          key="og:title"
          property="og:title"
          content="Braswell Kenneth Azu Junior"
        />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <main className="bg-neutral-900 text-white min-h-screen">
        {/* background */}
        <div className="stars-one" />
        <div className="stars-two" />
        <div className="stars-three" />
        <div className="stars-four" />
        {/* body */}
        <div className={clsx('z-[1] relative')}>
          <Component {...pageProps} />
        </div>
      </main>
    </>
  )
}

export default App
