import type { Metadata } from 'next';
import { StatusScreen } from '@/components/shared/status-screen';

export const metadata: Metadata = {
  title: 'Page not found'
};

export default function NotFound() {
  return (
    <StatusScreen
      code="404"
      kicker="Signal lost"
      title="This page could not be found."
      description="The link may be out of date, or the page has moved somewhere warmer. Here are three places that definitely still exist."
      actions={[
        { label: 'Go home', href: '/' },
        { label: 'Browse projects', href: '/projects' },
        { label: 'Read the blog', href: '/blog' }
      ]}
      className="min-h-dvh"
    />
  );
}
