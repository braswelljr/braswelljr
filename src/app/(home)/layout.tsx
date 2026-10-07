import { type Metadata } from 'next';

// Inherited by the landing page only. Each section below sets its own.
export const metadata: Metadata = {
  alternates: { canonical: '/' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
