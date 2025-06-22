import { FaFigma, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Career } from 'types/types';

export const socials = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/braswell-kenneth-870827192/', icon: FaLinkedin },
  { name: 'GitHub', url: 'https://github.com/braswelljr', icon: FaGithub },
  { name: 'Instagram', url: 'https://www.instagram.com/braswell_jr/', icon: FaInstagram },
  { name: 'X', url: 'https://x.com/braswell_jnr', icon: FaXTwitter },
  { name: 'Figma', url: 'https://www.figma.com/@braswelljr', icon: FaFigma }
];

export const education = [];

/**
 * career - List of careers
 */
export const career: Array<Career> = [
  {
    role: 'Software Engineer',
    type: '(Fulltime)',
    company: ' Global Tech Network LLC, US',
    companyLink: '#',
    date: 'June 2025 - Current',
    description: [
      'Collaborate and implement web animations and applications for clients (React).',
      'Shadow and collaborate Senior Engineers to implement authentication and security for dashboards (PHP/React/TypeScript).'
    ]
  },
  {
    role: 'Software Engineer',
    type: '(Contract)',
    company: 'SonicAI, US',
    companyLink: '#',
    date: 'Nov 2024 - Jan 2025',
    description: [
      'Built and deployed the SonicAI website.',
      'Collaborated with the UI/UX team to implement design enhancements.',
      'Integrated RESTful APIs to deliver core features.'
    ]
  },
  {
    role: 'Software Engineer',
    type: '(Contract)',
    company: 'Infinanze Technologies, US',
    companyLink: '#',
    date: 'Jul 2023 - Nov 2024',
    description: [
      'Built and maintained frontend web applications (Web3, Crypto, EMS Software).',
      'Collaborated with the backend team to plan database schemas and parameters.',
      'Simplified enterprise systems with user-friendly interfaces.'
    ]
  },
  {
    role: 'Software Engineer',
    type: '(Freelancing)',
    company: 'Morlan Technologies, Ghana',
    companyLink: 'https://morlan.tech',
    date: 'Apr 2022 - Aug 2024',
    description: [
      'Spearheaded the development of web applications using React and TypeScript.',
      'Collaborated with mobile developers working with Flutter.',
      'Built cloud and edge functions using Firebase and Supabase.'
    ]
  },
  {
    role: 'Software Engineer',
    type: '(National Service)',
    company: 'Solar Taxi, Accra, Ghana',
    companyLink: 'https://solartaxi.co',
    date: 'Nov 2022 - Sep 2023',
    description: [
      'Managed and maintained Wote backend APIs using Go.',
      'Developed enterprise web application features using React and TypeScript.'
    ]
  },
  {
    role: 'Software Engineer',
    type: '(Intern)',
    company: 'The Hive, Kumasi, Ghana',
    companyLink: 'https://kumasi-hive.com',
    date: 'Apr 2021 - Nov 2021',
    description: [
      'Designed UIs for mobile/web platforms and contributed to the Hive Institute project.',
      'Shadowed senior engineers and acquired new technical skills.'
    ]
  },
  {
    role: 'Software Developer',
    type: '(Freelance)',
    company: 'Freelancing',
    companyLink: '#',
    date: 'Jun 2020 - Present',
    description: [
      'Built websites and applications for startups and institutions.',
      'Handled full project lifecycle from requirements gathering to deployment.'
    ]
  }
];

export const OTHER_PROJECTS = [
  {
    name: 'Carbazza',
    homepageUrl: 'https://carbazza.vercel.app',
    url: '',
    description:
      'Carbazza is a comprehensive online platform for car enthusiasts, providing a wide range of services and resources to help them make informed decisions about purchasing, maintaining, and upgrading their vehicles.'
  },
  {
    name: 'OZ Moview',
    homepageUrl: 'https://oz-seven.vercel.app/',
    url: 'https://github.com/braswelljr/oz',
    description: 'Oz Moview is a movie review platform utilizing the TMDB API.'
  },
  {
    name: 'TheseuxX',
    homepageUrl: 'https://theseusx.vercel.app',
    url: '',
    description: 'Official Platform for the ThesesuX Real Estate Project.'
  },
  {
    name: 'Yomyom',
    homepageUrl: 'https://yomyom.vercel.app',
    url: '',
    description: 'Express Delivery and More'
  }
];
