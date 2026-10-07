import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Who Braswell Jr is: experience, education and the work behind the portfolio.',
  alternates: { canonical: '/about' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
