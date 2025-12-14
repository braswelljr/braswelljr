import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { blog } from 'lib/source';
import Navbar from '~/components/navbar';

export default function Layout({ children }: LayoutProps<'/blog/[...slug]'>) {
  return (
    <DocsLayout
      tree={blog.pageTree}
      sidebar={{ enabled: false }}
      nav={{ component: <Navbar className="bg-white/50 backdrop-blur dark:bg-neutral-900/90" />, transparentMode: 'top' }}
      githubUrl="https://github.com/braswelljr"
    >
      {children}
    </DocsLayout>
  );
}
