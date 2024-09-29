import { FaFigma, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Career } from 'types/types'

export const socials = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/braswell-kenneth-870827192/', icon: FaLinkedin },
  { name: 'GitHub', url: 'https://github.com/braswelljr', icon: FaGithub },
  { name: 'Instagram', url: 'https://www.instagram.com/braswell_jr/', icon: FaInstagram },
  { name: 'X', url: 'https://x.com/braswell_jnr', icon: FaXTwitter },
  { name: 'Figma', url: 'https://www.figma.com/@braswelljr', icon: FaFigma }
]

export const education = []

/**
 * career - List of careers
 */
export const career: Array<Career> = [
  {
    role: 'Software Engineer',
    type: '(Remote / Freelancing)',
    company: 'Infinanze Technologies, US',
    companyLink: '#',
    date: 'July 1, 2023 - Present',
    description: [
      'Implement frontend web applications and websites.',
      'Suggest and plan solutions with the UI/UX team.',
      'Suggest and Plan solutions for software projects.',
      'Collaborate with the backend team to integrate APIs to make functional frontend applications.'
    ]
  },
  {
    role: 'Software Engineer',
    type: '(Remote / Freelancing)',
    company: 'Morlan Technologies, Ghana',
    companyLink: 'https://morlan.tech',
    date: 'April, 2023 - August, 2024',
    description: [
      'Plan solutions for software projects.',
      'Design and implement backend APIs for web and mobile applications.',
      'Implement frontend web applications.'
    ]
  },
  {
    role: 'Software Engineer',
    type: '(National Service / Seasonal)',
    company: 'Solar Taxi, Accra - Ghana',
    companyLink: 'https://solartaxi.co',
    date: 'November 1, 2022 - October 31, 2023',
    description: [
      'Plan solutions for software projects.',
      'Design and implement backend APIs for web and mobile applications.',
      'Collaborate with team members to improve existing systems by refactoring old legacy code.',
      'Implement frontend web applications.'
    ]
  },
  {
    role: 'Software Engineer',
    type: '(Internship)',
    company: 'The Hive, Kumasi - Ghana',
    companyLink: 'https://kumasi-hive.com',
    date: 'April 20, 2021 - November 12, 2021',
    description: [
      "Build and design software systems to satisfy users' needs.",
      'Design User Interfaces to be implemented into mobile for the frontend and mobile application teams.',
      'Collaborated with team members to implement the Hive Institute platform.'
    ]
  },
  {
    role: 'Software Engineer',
    type: '(Freelancing)',
    company: 'Freelancing',
    companyLink: '#',
    date: 'Sep 14, 2018 - Present',
    description: [
      'Build websites and web applications for institutions and startups with the sole responsibility of ensuring clients are satisfied and requirements are met.'
    ]
  }
]

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
]
