import clsx from 'clsx'
import { HiHome, HiCode, HiOutlineArchive } from 'react-icons/hi'
import { IoIosPerson } from 'react-icons/io'

export const nav = [
  {
    name: 'Home',
    path: '/',
    icon: <HiHome className={clsx('h-5 w-auto')} />
  },
  {
    name: 'About',
    path: '/about',
    icon: <IoIosPerson className={clsx('h-5 w-auto')} />
  },
  {
    name: 'Technical Skills',
    path: '/technical-skills',
    icon: <HiCode className={clsx('h-5 w-auto')} />
  },
  {
    name: 'Projects',
    path: '/projects',
    icon: <HiOutlineArchive className={clsx('h-5 w-auto')} />
  }
]
