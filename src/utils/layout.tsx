import { BaseLayoutProps } from 'fumadocs-ui/layouts/links';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { siteConfig } from '~/config/site';

export function baseOptions(): BaseLayoutProps {
  const config: BaseLayoutProps = {
    themeSwitch: {
      mode: 'light-dark-system'
    },
    nav: {
      transparentMode: 'always',
      title: (
        <span className="flex items-center gap-2">
          <Avatar className="size-8 rounded-none">
            <AvatarImage
              src="/icons/b.png"
              alt="B"
              className="hidden dark:block"
            />
            <AvatarImage
              src="/icons/black-b.png"
              alt="B"
              className="dark:hidden"
            />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <span>{siteConfig.name}</span>
        </span>
      )
    }
    // links: [
    //   {
    //     type: 'main',
    //     text: 'Documentation',
    //     description: 'Learn to use GLab',
    //     url: '/docs'
    //   }
    // ]
  };

  return config;
}
