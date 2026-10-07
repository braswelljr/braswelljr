// Posts domain types. The counters a reader sees under a blog post.

export type PostStats = {
  views: number;
  likes: number;
};

export type PostStatsAction = 'view' | 'like' | 'unlike';
