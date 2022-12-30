import { ReactNode, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch
} from 'kbar'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import copyLinkIcon from '@/assets/icons/copy-link.json'
import sourceIcon from '@/assets/icons/source.json'
import aboutIcon from '@/assets/icons/about.json'
import homeIcon from '@/assets/icons/home.json'
import projectsIcon from '@/assets/icons/projects.json'
import moonstarsIcon from '@/assets/icons/moonstars.json'
import suncloudIcon from '@/assets/icons/sunclouds.json'
import Toast from '@/components/Toast'
import CommandRenderResults from '@/components/CommandRenderResults'
import useTheme from '@/hooks/useTheme'

const CommandBar = ({ children }: { children?: ReactNode }) => {
  const copyLinkRef = useRef<LottieRefCurrentProps>(null)
  const sourceRef = useRef<LottieRefCurrentProps>(null)
  const homeRef = useRef<LottieRefCurrentProps>(null)
  const aboutRef = useRef<LottieRefCurrentProps>(null)
  const projectsRef = useRef<LottieRefCurrentProps>(null)
  const moonstarsRef = useRef<LottieRefCurrentProps>(null)
  const suncloudRef = useRef<LottieRefCurrentProps>(null)
  const router = useRouter()
  const [showToast, setShowToast] = useState(false) // show toast when link is copied
  const iconSize = { width: 20, height: 20 }

  // theme
  const { setTheme } = useTheme()

  const actions = [
    {
      id: 'copy',
      name: 'Copy Link',
      shortcut: ['l'],
      keywords: 'copy-link',
      section: 'General',
      perform: () => {
        navigator.clipboard.writeText(window.location.href)
        setShowToast(true)
      },
      icon: (
        <Lottie
          lottieRef={copyLinkRef}
          style={iconSize}
          animationData={copyLinkIcon}
          loop={false}
          autoplay={false}
        />
      )
    },
    {
      id: 'source',
      name: 'View Source',
      shortcut: ['s'],
      keywords: 'view-source',
      section: 'General',
      perform: () =>
        window.open('https://github.com/braswelljr/braswelljr', '_blank'),
      icon: (
        <Lottie
          lottieRef={sourceRef}
          style={iconSize}
          animationData={sourceIcon}
          loop={false}
          autoplay={false}
        />
      )
    },
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      keywords: 'go-home',
      section: 'Go To',
      perform: () => router.push('/'),
      icon: (
        <Lottie
          lottieRef={homeRef}
          style={iconSize}
          animationData={homeIcon}
          loop={false}
          autoplay={false}
        />
      )
    },
    {
      id: 'about',
      name: 'About',
      shortcut: ['g', 'a'],
      keywords: 'go-about',
      section: 'Go To',
      perform: () => router.push('/about'),
      icon: (
        <Lottie
          lottieRef={aboutRef}
          style={iconSize}
          animationData={aboutIcon}
          loop={false}
          autoplay={false}
        />
      )
    },
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['g', 'p'],
      keywords: 'go-projects',
      section: 'Go To',
      perform: () => router.push('/projects'),
      icon: (
        <Lottie
          lottieRef={projectsRef}
          style={iconSize}
          animationData={projectsIcon}
          loop={false}
          autoplay={false}
        />
      )
    },
    {
      id: 'dark',
      name: 'Dark',
      shortcut: ['t', 'd'],
      keywords: 'dark theme',
      section: 'Theme',
      perform: () => setTheme('dark'),
      icon: (
        <Lottie
          lottieRef={moonstarsRef}
          style={iconSize}
          animationData={moonstarsIcon}
          loop={false}
          autoplay={false}
        />
      )
    },
    {
      id: 'light',
      name: 'Light',
      shortcut: ['t', 'l'],
      keywords: 'light theme',
      section: 'Theme',
      perform: () => setTheme('light'),
      icon: (
        <Lottie
          lottieRef={suncloudRef}
          style={iconSize}
          animationData={suncloudIcon}
          loop={false}
          autoplay={false}
        />
      )
    }
  ]

  return (
    <KBarProvider actions={actions} options={{ enableHistory: true }}>
      <KBarPortal>
        <KBarPositioner className="fixed inset-0 z-[5] flex bg-neutral-900/80 !px-0 !pt-0 md:justify-center md:!px-16 md:!pt-16">
          <KBarAnimator className="relative min-h-[450px] w-full max-w-7xl overflow-hidden rounded bg-gray-600 text-neutral-100 dark:bg-neutral-900 dark:text-white max-md:inset-x-0 max-md:top-0 md:w-5/6 lg:w-[850px] [&_>_div_>_div::-webkit-scrollbar]:hidden [&_>_div_>_div]:[-ms-overflow-style:none] [&_>_div_>_div]:[scrollbar-width:none]">
            <KBarSearch
              placeholder="Type a command or search…"
              className="m-0 w-full border-0 border-b border-none bg-gray-600 px-5 py-6 text-neutral-100 outline-none placeholder:text-xs placeholder:text-neutral-400 dark:bg-neutral-900 dark:text-white md:placeholder:text-sm"
              autoFocus
            />
            <CommandRenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
      <Toast
        showToast={showToast}
        setShowToast={setShowToast}
        title="Link copied to clipboard"
        description="You can now paste the link anywhere you want"
        type="success"
        className="rounded"
      />
    </KBarProvider>
  )
}

export default CommandBar
