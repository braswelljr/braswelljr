import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listen with me',
  description: 'What Braswell Jr is playing right now on Spotify, with top tracks and playlists.',
  alternates: { canonical: '/listen-with-me' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
