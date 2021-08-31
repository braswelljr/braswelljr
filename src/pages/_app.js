import '../styles/globals.css'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Head from 'next/head'
import { StoreProvider } from '../store/store'

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    AOS.init({
      mirror: true,
      offset: 200,
      duration: 500,
      easing: 'ease'
    })
  }, [])

  return (
    <>
      <StoreProvider>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta
            name="braswelljr"
            content="Braswell Kenneth Personal portfolio"
          />
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
        <Component {...pageProps} />
      </StoreProvider>
    </>
  )
}

export default App
