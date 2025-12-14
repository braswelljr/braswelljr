import { Fragment } from 'react';

type LayoutProps = React.PropsWithChildren & {};

export default function Layout({ children }: LayoutProps) {
  return <Fragment>{children}</Fragment>;
}
