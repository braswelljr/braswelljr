import { FaFigma, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Career, Education } from 'types/types';

export const socials = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/braswell-kenneth-870827192/',
    icon: FaLinkedin
  },
  { name: 'GitHub', url: 'https://github.com/braswelljr', icon: FaGithub },
  { name: 'Instagram', url: 'https://www.instagram.com/braswell_jr/', icon: FaInstagram },
  { name: 'X', url: 'https://x.com/braswell_jnr', icon: FaXTwitter },
  { name: 'Figma', url: 'https://www.figma.com/@braswelljr', icon: FaFigma }
];

export const education: Array<Education> = [
  {
    name: 'B.Sc Computer Science and Engineering',
    degree: 'Bachelor of Science',
    date: {
      from: new Date(2018, 8, 1), // September 2018 (typical start for Ghanaian universities)
      to: new Date(2022, 10, 1) // October 2022 (graduation month)
    },
    school: 'University of Mines and Technology, Ghana',
    description: []
  }
];

/**
 * skills - Technical skills, grouped as the resume groups them.
 *
 * Kept beside `career` and `education` so the About page has one source for
 * everything the resume states, rather than prose that drifts out of date.
 */
export const skills: Array<{ group: string; items: string[] }> = [
  { group: 'Programming Languages', items: ['JavaScript', 'TypeScript', 'Go', 'Dart', 'PHP'] },
  {
    group: 'Frameworks & Libraries',
    items: [
      'React (Next.js, Remix, Gatsby)',
      'Vue',
      'React Native',
      'Flutter',
      'Node.js (Express, Encore)',
      'Go (Encore, Mux, Gin)',
      'PHP (Laravel, NativePHP)'
    ]
  },
  {
    group: 'Styling & Animation',
    items: ['TailwindCSS', 'SASS', 'PostCSS', 'Motion', 'GSAP']
  },
  { group: 'State Management', items: ['Zustand', 'Redux', 'Jotai', 'Riverpod'] },
  { group: 'Databases & Storage', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'] },
  { group: 'APIs & Communication', items: ['REST', 'GraphQL', 'gRPC', 'Slack', 'Jira'] },
  { group: 'DevOps & Infrastructure', items: ['Docker', 'AWS', 'GCP', 'GitHub Actions'] },
  { group: 'Observability & Monitoring', items: ['Grafana', 'Sentry'] },
  { group: 'Spoken Languages', items: ['English (Fluent)', 'French (Elementary)'] }
];

/**
 * career - List of careers
 */
export const career: Array<Career> = [
  {
    role: 'Software Engineer',
    type: 'Contract',
    company: 'Ghana School of Law',
    companyLink: 'https://www.gslaw.edu.gh',
    date: {
      from: new Date(2025, 10, 1), // November 2025 (month is 0-indexed)
      to: new Date() // Current
    },
    description: [
      'Built and developed the Student Companion app, enhancing student learning and collaboration through intuitive mobile-first design (PHP/Laravel/NativePHP/React/React Native)',
      'Developer and sole maintainer for the Special Courses platform, streamlining course delivery and collaboration for students and administrators (React (Next.js)/TypeScript/Golang)',
      'Maintainer for External Services for the Student Management System and APIs connecting the Student Companion mobile app to backend systems, ensuring data consistency across mobile and the Student Management System (Laravel/PHP)',
      'Implemented CI/CD workflows, automating deployments and improving development efficiency (GitHub Actions/Docker)',
      'Direct mobile UI/UX design strategy for all platform applications, delivering accessible and intuitive interfaces that enhance user satisfaction, engagement and retention',
      'Spearheaded the co-creation and remain the exclusive maintainer of GSL Forms, a platform dedicated to facilitating internal and external surveys to boost user engagement at the Ghana School of Law',
      'Currently the sole maintainer for the Ghana School of Law Events system, which handles major events as well as staff voting and balloting',
      'Document and lead engineering for development of Accreditation, Quality Assurance and Inspectorate Systems while collaborating on the Student Life Cycle process and projects for the Council for Legal Education & Training (CLET) (React (Monorepo)/TypeScript/Golang)'
    ]
  },
  {
    role: 'Software Engineer',
    type: 'Contract',
    company: 'Global Tech Network LLC',
    companyLink: 'https://www.gtnllc.com',
    date: {
      from: new Date(2025, 5, 1), // June 2025
      to: new Date(2025, 10, 1) // November 2025
    },
    description: [
      'Implemented web components and animations for the MSPX projects (React)',
      'Shadow and collaborate with colleague Engineers to integrate backend APIs for Client Evaluation (PHP/React/TypeScript)'
    ]
  },
  {
    role: 'Software Engineer',
    type: 'Contract',
    company: 'SonicAI',
    companyLink: '',
    date: {
      from: new Date(2024, 10, 1), // November 2024
      to: new Date(2025, 0, 1) // January 2025
    },
    description: [
      'Successfully launched the SonicAI platform to establish a scalable web presence',
      'Partnered with UI/UX designers to refine interface elements, significantly improving user interaction and platform aesthetics',
      'Orchestrated seamless RESTful API integrations to drive core system functionality and ensure high-performance data delivery'
    ]
  },
  {
    role: 'Software Engineer',
    type: 'Contract',
    company: 'Infinanze Technologies',
    companyLink: 'https://www.infinanze.com/',
    date: {
      from: new Date(2023, 6, 1), // July 2023
      to: new Date(2024, 10, 1) // November 2024
    },
    description: [
      'Advanced frontend capabilities for Web3, Crypto and EMS platforms by collaborating with cross-functional teams to architect efficient database schemas and seamless API integrations',
      'Optimized enterprise systems (Levr, Noolag) by delivering high-fidelity, intuitive interfaces that streamlined complex business workflows and improved user productivity'
    ]
  },
  {
    role: 'Frontend Software Developer',
    type: 'Part-Time',
    company: 'Benchfive LLC',
    companyLink: 'https://benchfive.org',
    date: {
      from: new Date(2024, 2, 1), // March 2024
      to: new Date(2025, 5, 1) // June 2025
    },
    description: [
      'Led the end-to-end development of scalable web applications for Benchfive, Workspace Global and Consolidated Logistics, delivering high-performance, user-centric solutions using React and TypeScript'
    ]
  },
  {
    role: 'Software Engineer',
    type: 'Freelancing',
    company: 'Morlan Technologies',
    companyLink: 'https://morlan.tech',
    date: {
      from: new Date(2022, 3, 1), // April 2022
      to: new Date(2024, 7, 1) // August 2024
    },
    description: [
      'Drove the architecture and development of high-impact web applications, leveraging React and TypeScript to ensure robust performance and maintainability',
      'Collaborated with mobile development teams to ensure cross-platform consistency and feature parity during the deployment of mobile applications (Flutter)',
      'Built and optimized scalable cloud and edge functions using Firebase and Supabase, ensuring reliable backend performance and data integrity',
      'Implemented a monorepo React template to cut setup time and standardize code quality, accelerating project onboarding'
    ]
  },
  {
    role: 'Software Engineer',
    type: 'National Service',
    company: 'Solar Taxi',
    companyLink: 'https://solartaxi.co',
    date: {
      from: new Date(2022, 7, 1), // August 2022
      to: new Date(2023, 8, 1) // September 2023
    },
    description: [
      'Managed the full lifecycle of Wote backend APIs as the sole developer, architecting reliable solutions using Go to support critical enterprise operations',
      'Engineered a robust enterprise web application using React and TypeScript, delivering a scalable platform to support organizational requirements'
    ]
  },
  {
    role: 'Software Engineer',
    type: 'Intern',
    company: 'Kumasi Hive, Kumasi, Ghana',
    companyLink: 'https://kumasi-hive.com',
    date: {
      from: new Date(2022, 7, 1), // August 2022
      to: new Date(2023, 8, 1) // September 2023
    },
    description: [
      'Designed intuitive UI/UX for mobile and web platforms, contributing to the Hive Institute project\u2019s success through efficient front-end and back-end integration',
      'Assumed ownership as the primary frontend developer for the Hive Institute Project, delivering high-quality, responsive interfaces using React and TypeScript'
    ]
  },
  {
    role: 'Software Developer',
    type: 'Freelance',
    company: 'Freelancing',
    companyLink: '#',
    date: {
      from: new Date(2020, 6, 1),
      to: new Date()
    }, //'Jun 2020 - Present',
    description: [
      'Built websites and applications for startups and institutions.',
      'Handled full project lifecycle from requirements gathering to deployment.'
    ]
  }
];

export const OTHER_PROJECTS = [
  {
    name: 'Ghana Timber Millers Organization',
    homepageUrl: 'https://gtmo.vercel.app',
    url: 'https://github.com/braswelljr/gtmo',
    description: 'Official Website for the Ghana Timber Millers Organization.'
  },
  {
    name: 'Glam Beauty Studio (Manager)',
    homepageUrl: 'https://manager-aeshglam.vercel.app',
    url: '',
    description: 'Redefining Elegance, Where Confidence Meets Creativity'
  },
  {
    name: 'Carbazza',
    homepageUrl: 'https://carbazza.vercel.app',
    url: '',
    description:
      'Carbazza is a comprehensive online platform for car enthusiasts, providing a wide range of services and resources to help them make informed decisions about purchasing, maintaining, and upgrading their vehicles.'
  },
  {
    name: 'Colored',
    homepageUrl: 'https://colored.vercel.app',
    url: 'https://github.com/braswelljr/colored',
    description:
      'Experience a world of personalized design with an array of handpicked colors at your disposal.'
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
