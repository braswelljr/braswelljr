import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document'

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en" className="scroll-smooth text-neutral-800 antialiased">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="shortcut icon"
            href="/favicon.ico?v=2"
            type="image/x-icon"
          />
          <link href="/icons/icon.png" rel="icon" type="image/png" />
          <meta name="theme-color" content="#317EFB" />

          <meta
            name="braswelljr"
            content="Braswell Kenneth Personal portfolio"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta
            name="apple-mobile-web-app-title"
            content="Braswell Kenneth Junior Portfolio"
          />
          <meta name="description" content="Personal Portfolio" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://twitter.com/braswell_jnr" />
          <meta name="twitter:title" content="@braswell_jnr" />
          <meta
            name="twitter:description"
            content="Portfolio of Braswell Kenneth Azu Junior"
          />
          <meta
            name="twitter:image"
            content="https://github.com/braswelljr/braswelljr/raw/main/src/img/kenb.jpg"
          />
          <meta name="twitter:creator" content="@braswell_ken" />
          <meta property="og:type" content="Brasweljr's Portfolio" />
          <meta property="og:title" content="Brasweljr" />
          <meta property="og:description" content="Brasweljr's Portfolio" />
          <meta property="og:site_name" content="rasweljr" />
          <meta property="og:url" content="https://brasweljr.engineer" />
          <meta
            property="og:image"
            content="https://github.com/braswelljr/glab-docs/raw/main/src/img/kenb.jpg"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script> </script>
        </body>
      </Html>
    )
  }
}
