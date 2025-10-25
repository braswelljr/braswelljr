type SiteConfig = {
  name: string;
  url: string;
  description: string;
  links: {
    twitter: string;
    github: string;
  };
};

export const siteConfig: SiteConfig = {
  name: 'braswelljr/braswelljr',
  url: 'https://braswelljr.engineer',
  description: 'Personal website of Braswell Jr. A software engineer, open source contributor, and a passionate learner.',
  links: {
    twitter: 'https://twitter.com/braswell_jnr',
    github: 'https://github.com/braswelljr/braswelljr'
  }
};
