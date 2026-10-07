import { isAfter, subDays } from 'date-fns';

/** A post as the index needs it. Dates are ISO strings so the object can cross
 *  from the server page into the client components. */
export type BlogPost = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  published: boolean;
  readingTime: string;
};

/** How long a post keeps its "New" marker: two weeks from publishing. */
const NEW_FOR_DAYS = 14;

/** Whether something published on `date` still counts as new. */
export function isNewDate(date: string | Date, now = new Date()): boolean {
  return isAfter(new Date(date), subDays(now, NEW_FOR_DAYS));
}

export function isNewPost(post: BlogPost, now = new Date()): boolean {
  return isNewDate(post.date, now);
}
