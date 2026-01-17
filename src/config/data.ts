import { FaFigma, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Career, Education } from 'types/types';

export const socials = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/braswell-kenneth-870827192/', icon: FaLinkedin },
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
 * career - List of careers
 */
export const career: Array<Career> = [
  {
    role: 'Fullstack Software Engineer',
    type: 'Full-Time',
    company: 'Ghana School of Law',
    companyLink: 'https://www.gslaw.edu.gh',
    date: {
      from: new Date(2025, 10, 19), // November 19, 2025 (month is 0-indexed)
      to: new Date() // Current
    },
    description: [
      'Built the Student Companion app, enhancing student learning and collaboration through intuitive mobile-first design (Laravel/PHP/NativePHP/React)',
      'Developed the Short Courses platform, streamlining course delivery and collaboration for students and administrators (React/TypeScript/Supabase)',
      'Built APIs connecting the Student Companion mobile app to backend systems, ensuring data consistency across mobile and Student Management System (Laravel/PHP)',
      'Lead mobile UI/UX design across all applications, creating accessible interfaces that drive user engagement and satisfaction',
      'Implemented CI/CD workflows, automating deployments and improving development efficiency (GitHub Actions/Docker)'
    ]
  },
  {
    role: 'Software Engineer',
    type: 'Contract',
    company: 'Global Tech Network LLC',
    companyLink: 'https://www.gtnllc.com',
    date: {
      from: new Date(2025, 5, 1), // June 2025 (month is 0-indexed)
      to: new Date(2025, 6, 1) // July 2025
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
      'Built and deployed the SonicAI website',
      'Collaborated with the UI/UX team to implement design enhancements',
      'Integrated RESTful APIs to deliver core features'
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
      'Developed and maintained frontend applications in Web3, Crypto, and EMS, while collaborating with backend teams on database design and integration',
      'Enhanced enterprise systems (Levr, Noolag) by delivering user-friendly interfaces that simplified complex workflows'
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
      'Spearheaded and collaborated on the development of web applications (Benchfive, Workspace Global, Consolidated Logistics) driving scalable and efficient solutions (React, TypeScript)'
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
      'Spearheaded the development of the web applications (React, TypeScript)',
      'Shadowed and collaborated with mobile developers building applications (Flutter)',
      'Built and maintained cloud and edge functions using Firebase and Supabase (Typescript)',
      'Implemented a monorepo React template to cut setup time and standardized code quality, accelerating project onboarding'
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
      'Shadowed and took charge of the Wote backend APIs as the sole developer (Go)',
      'Developed the enterprise web application for enterprises (React, TypeScript)'
    ]
  },
  {
    role: 'Software Engineer',
    type: 'Intern',
    company: 'The Hive, Kumasi, Ghana',
    companyLink: 'https://kumasi-hive.com',
    date: {
      from: new Date(2021, 4, 1),
      to: new Date(2021, 11, 1)
    }, //'Apr 2021 - Nov 2021',
    description: [
      'Designed UIs for mobile/web platforms and contributed to the Hive Institute project. (React/Go)',
      'Stepped up as the sole frontend developer for the Hive Institute Project  (React, TypeScript)'
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
    description: 'Experience a world of personalized design with an array of handpicked colors at your disposal.'
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
