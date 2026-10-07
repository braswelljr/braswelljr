import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Open source work, pinned repositories, contribution history and the stack behind them.',
  alternates: { canonical: '/projects' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
