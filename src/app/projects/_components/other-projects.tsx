import Link from 'next/link';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { cn } from 'lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { OTHER_PROJECTS } from '~/config/data';

type OtherProjectProps = {
  className?: string;
};

export function OtherProjects({ className }: OtherProjectProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-end justify-between">
        <h2 className="text-2xl leading-tight font-bold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl dark:text-neutral-100">
          Other Projects
        </h2>
        <span className="text-lg">({OTHER_PROJECTS.length})</span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {OTHER_PROJECTS.map((project, i) => {
          return (
            <Card
              key={i}
              className="border border-neutral-700/30 py-4 backdrop-blur dark:bg-neutral-900/50"
            >
              <CardHeader className="">
                <Avatar className="aspect-video h-full max-h-54 w-full rounded bg-neutral-200 dark:bg-neutral-900">
                  <AvatarImage
                    src={`/api/screenshot?url=${project.homepageUrl}`}
                    alt={project.name}
                    className="aspect-video size-full object-cover object-top"
                  />
                  <AvatarFallback
                    className="aspect-video size-full animate-pulse rounded-none p-5 text-center"
                    style={{ animationDelay: `${i}s` }}
                  >
                    {project.name}
                  </AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent className="">
                <CardTitle className="from-secondary to-primary dark:to-primary flex items-center space-x-2 bg-linear-to-l bg-clip-text text-sm text-transparent uppercase">
                  {project.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="">
                <Link
                  href={project.homepageUrl ? project.homepageUrl : project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex cursor-pointer items-center justify-center space-x-2 rounded-sm bg-neutral-900 px-1.5 py-1 text-xs text-neutral-100 uppercase transition-transform backdrop:backdrop-blur hover:scale-105 focus:outline-none dark:bg-neutral-500/50 dark:text-white"
                >
                  <HiOutlineExternalLink className="h-4 w-auto group-hover:scale-95" />
                  <span>Visit</span>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
