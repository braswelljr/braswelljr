'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';

export default function Title({ suffix, children }: { suffix?: string; children?: string | JSX.Element }) {
  const pathname = usePathname();
  const title = children + (suffix ? ` - ${suffix}` : '');

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="glab" content="GitLab command line tool" />
      <meta name="keywords" content="Keywords" />
      {pathname === '/' ? <title key="title">Braswell Jr.</title> : <title key="title">{title}</title>}
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="og:title" property="og:title" content={title} />
    </Head>
  );
}
