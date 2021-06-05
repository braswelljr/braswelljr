import { useState, forwardRef } from 'react'
import clsx from 'clsx'
import NextLink from 'next/link'
import {
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaJsSquare,
  FaCss3,
  FaPython,
  FaHtml5,
  FaPhp,
  FaFigma,
  FaAdobe,
  FaLaravel,
  FaBootstrap,
  FaNodeJs,
  FaVuejs,
  FaReact
} from 'react-icons/fa'
import { SiCplusplus, SiDjango, SiGmail, SiTailwindcss } from 'react-icons/si'
import jr from '../assets/jr.jpg'

const SocialLink = forwardRef(({ children, href, className, target }, ref) => {
  return (
    <NextLink href={href} ref={ref}>
      <a target={target} className={clsx(className)}>
        {children}
      </a>
    </NextLink>
  )
})

const Index = () => {
  const [mail, setMail] = useState('')
  const links = [
    {
      name: 'GitHub',
      href: 'https://github.com/braswelljr',
      icon: <FaGithub className="w-auto h-8" />
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/brakez_ken',
      icon: <FaTwitter className="w-auto h-8" />
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/braswell_jr',
      icon: <FaInstagram className="w-auto h-8" />
    }
  ]

  const DomainKnowledge = [
    'UI Design',
    'Software Engineering',
    'Database Administration'
  ]

  const Languages = [
    {
      language: 'JavaScript',
      level: 'Advanced', // -> semi-pro, pro, advanced
      icon: <FaJsSquare className="w-auto h-full mx-auto" />
    },
    {
      language: 'CSS',
      level: 'Advanced', // -> semi-pro, pro, advanced
      icon: <FaCss3 className="w-auto h-full mx-auto" />
    },
    {
      language: 'Python',
      level: 'Pro', // -> semi-pro, pro, advanced
      icon: <FaPython className="w-auto h-full mx-auto" />
    },
    {
      language: 'HTML',
      level: 'Advanced', // -> semi-pro, pro, advanced
      icon: <FaHtml5 className="w-auto h-full mx-auto" />
    },
    {
      language: 'Git',
      level: 'Pro', // -> semi-pro, pro, advanced
      icon: <FaGithub className="w-auto h-full mx-auto" />
    },
    {
      language: 'PHP',
      level: 'Pro', // -> semi-pro, pro, advanced
      icon: <FaPhp className="w-auto h-full mx-auto" />
    },
    {
      language: 'C++',
      level: 'Pro', // -> semi-pro, pro, advanced
      icon: <SiCplusplus className="w-auto h-full mx-auto" />
    },
    {
      language: 'User Interface',
      level: 'Pro', // -> semi-pro, pro, advanced
      icon: <FaFigma className="w-auto h-full mx-auto" />
    }
  ]

  const frameworks = [
    {
      name: 'React',
      language: 'JavaScript',
      level: 'Pro', // -> semi-pro, pro, advanced
      icon: <FaReact className="w-auto h-full mx-auto" />
    },
    {
      name: 'Vue',
      language: 'JavaScript',
      level: 'Pro', // -> semi-pro, pro, advanced
      icon: <FaVuejs className="w-auto h-full mx-auto" />
    },
    {
      name: 'Node.js',
      language: 'JavaScript',
      level: 'Advanced', // -> semi-pro, pro, advanced
      icon: <FaNodeJs className="w-auto h-full mx-auto" />
    },
    {
      name: 'Bootstrap',
      language: 'CSS',
      level: 'Advanced', // -> semi-pro, pro, advanced
      icon: <FaBootstrap className="w-auto h-full mx-auto" />
    },
    {
      name: 'Tailwindcss',
      language: 'CSS',
      level: 'Advanced', // -> semi-pro, pro, advanced
      icon: <SiTailwindcss className="w-auto h-full mx-auto" />
    },
    {
      name: 'Laravel',
      language: 'PHP',
      level: 'Pro', // -> semi-pro, pro, advanced
      icon: <FaLaravel className="w-auto h-full mx-auto" />
    },
    {
      name: 'Django',
      language: 'Python',
      level: 'Advanced', // -> semi-pro, pro, advanced
      icon: <SiDjango className="w-auto h-full mx-auto" />
    },
    {
      name: 'Figma',
      language: 'User Interface',
      level: 'Pro', // -> semi-pro, pro, advanced
      icon: <FaFigma className="w-auto h-full mx-auto" />
    },
    {
      name: 'Adobe XD',
      language: 'User Interface',
      level: 'Advanced', // -> semi-pro, pro, advanced
      icon: <FaAdobe className="w-auto h-full mx-auto" />
    }
  ]
  return (
    <main className="space-y-12">
      <section
        style={{ backgroundImage: `url(${jr})` }}
        className="bg-gradient-to-r bg-cover bg-no-repeat bg-top text-white from-[#ff006a] clipHead via-[#c800ff] w-full h-full to-[#0055ff]"
      >
        <section
          style={{}}
          className={clsx(
            'space-y-16 bg-pink-900 bg-opacity-50 py-20 min-h-[70vh] w-full h-full'
          )}
        >
          <section
            className={clsx(
              'w-4/5 lg:w-4/6 mx-auto backdrop-filter bg-white bg-opacity-10 rounded-lg backdrop-blur-[2px] grid md:grid-cols-2 gap-4 py-12'
            )}
          >
            <div className="grid grid-cols-2 grid-rows-2 gap-4 px-4 py-6 mx-auto bg-gray-100 bg-opacity-25 rounded-md">
              <span
                className={clsx(
                  'w-12 h-12 bg-white bg-opacity-50 rounded-full'
                )}
              />
              <span
                className={clsx(
                  'w-12 h-12 bg-white bg-opacity-50 rounded-t-full'
                )}
              />
              <span
                className={clsx(
                  'w-full h-12 rounded-b-full bg-white bg-opacity-50 col-span-full'
                )}
              />
            </div>
            <div className="mx-auto md:mx-0">
              <h1 className="font-serif font-black text-7xl">braswelljr</h1>
              <p className="mt-6 font-sans font-medium text-center uppercase md:mt-10 md:text-left">
                Name your design
              </p>
            </div>
          </section>

          {/* Links */}
          <section className="w-4/5 mx-auto lg:w-4/6">
            <div className="grid gap-7 lg:grid-cols-3">
              {links.map(link => (
                <SocialLink
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    'flex items-center bg-white rounded-lg font-sans py-2 bg-opacity-20 justify-center space-x-5 transform transition-transform duration-300 backdrop-filter backdrop-blur-[2px] hover:shadow-lg hover:-translate-y-1'
                  )}
                  target="_blank"
                >
                  <span>{link.icon}</span>
                  <span className="text-2xl font-extrabold">{link.name}</span>
                </SocialLink>
              ))}
            </div>
          </section>
        </section>
      </section>

      <section
        className={clsx(
          'py-5 text-lg w-full text-gray-700 px-8 md:px-0 space-y-10 md:w-4/5 lg:w-4/6 mx-auto'
        )}
      >
        <div className={clsx('')}>
          <h3 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#ff006a] via-[#c800ff] to-[#0055ff]">
            Braswell Kenneth Junior Azu
          </h3>
          <p className="mt-4 text-purple-900">
            I am Software Engineer with experience in solution design and
            implementation of technical sofware projects. A curious devaloper
            who likes to build the world through code.
          </p>
        </div>
        <div className={clsx('')}>
          <h3 className="font-extrabold bg-clip-text uppercase text-3xl text-transparent bg-gradient-to-r from-[#ff006a] via-[#c800ff] to-[#0055ff]">
            Domain Knowledge
          </h3>
          <div className="text-purple-900">
            {DomainKnowledge.map(k => (
              <span key={k} className="flex items-center space-x-2">
                <span className="block w-1 h-1 bg-gradient-to-r from-[#c800ff] rounded-full to-[#0055ff]"></span>
                <span>{k}</span>
              </span>
            ))}
          </div>
        </div>

        <div className={clsx('space-y-6')}>
          <div className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#ff006a] via-[#c800ff] to-[#0055ff]">
            <h3 className="text-3xl uppercase">Technical Skills</h3>
            <h3 className="mt-4 text-2xl">Languages</h3>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-6">
            {Languages.map(skill => (
              <div
                className="flex items-center w-full h-auto p-2 space-x-8 text-purple-900 transition-all transform bg-purple-200 rounded-lg cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
                key={skill.name}
              >
                <div className="w-auto h-12">{skill.icon}</div>
                <div className="w-full h-full">
                  <div className="text-base">{skill.language}</div>
                  <span className="px-3 py-1 text-xs text-white bg-purple-900 rounded-lg">
                    {skill.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={clsx('space-y-6')}>
          <div className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#ff006a] via-[#c800ff] to-[#0055ff]">
            <h3 className="mt-4 text-2xl">Frameworks</h3>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
            {frameworks.map(skill => (
              <div
                className="flex items-center w-full h-auto p-2 space-x-8 text-purple-900 transition-all transform bg-purple-200 rounded-lg cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
                key={skill.name}
              >
                <div className="w-auto h-12">{skill.icon}</div>
                <div className="w-full h-full">
                  <div className="text-base">{skill.name}</div>
                  <div className="space-x-1">
                    <span className="px-3 py-1 text-xs text-white bg-pink-700 rounded-lg">
                      {skill.language}
                    </span>
                    <span className="px-3 py-1 text-xs text-white bg-purple-900 rounded-lg">
                      {skill.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* email */}
      <section className="w-4/5 mx-auto lg:w-4/6 grid text-purple-800 gap-4 lg:grid-cols-[3fr,2fr]">
        <form className="">
          <input
            type="text"
            placeholder="Message"
            value={mail}
            onChange={e => setMail(e.target.value)}
            autoComplete="off"
            name="email-input"
            id="email-input"
            className="w-full p-3 font-semibold text-purple-900 placeholder-purple-300 border border-purple-300 rounded focus:outline-none focus:border-purple-600 focus:ring-0"
          />
        </form>
        <div className="flex items-center justify-center mt-6">
          <span className="inline-flex justify-center mx-auto space-x-4 font-bold text-center">
            <SiGmail className="w-auto h-6" />{' '}
            <span>braswellkenneth7@gmail.com</span>
          </span>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 text-center text-white bg-gradient-to-r from-[#ff006a] uppercase text-xl font-semibold via-[#c800ff] to-[#0055ff]">
        braswelljr &copy; Copyright {new Date().getFullYear()}
      </section>
    </main>
  )
}

export default Index
