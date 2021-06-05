import '../styles/globals.css'
import React from 'react'
import Head from 'next/head'

const App = ({ Component, pageProps }) => {
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
        {/* <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
        <link href="/icons/icon192.png" rel="icon" type="image/png" />
        <link href="/icons/icon512.png" rel="icon" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" /> */}
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
