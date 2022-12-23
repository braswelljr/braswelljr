import localfont from '@next/font/local'

export const Sen = localfont({
  src: [
    { path: '../fonts/sen/sen.regular.otf', weight: '400' },
    { path: '../fonts/sen/sen.bold.otf', weight: '700' },
    { path: '../fonts/sen/sen.extrabold.otf', weight: '800' }
  ],
  preload: true,
  variable: '--font-sen'
})

export const EuclidCircularB = localfont({
  src: [
    { path: '../fonts/euclid-circular-b/light.ttf', weight: '300' },
    { path: '../fonts/euclid-circular-b/light-italic.ttf', weight: '300' },
    { path: '../fonts/euclid-circular-b/regular.ttf', weight: '400' },
    { path: '../fonts/euclid-circular-b/italic.ttf', weight: '400' },
    { path: '../fonts/euclid-circular-b/medium.ttf', weight: '500' },
    { path: '../fonts/euclid-circular-b/medium-italic.ttf', weight: '500' },
    { path: '../fonts/euclid-circular-b/semibold.ttf', weight: '600' },
    { path: '../fonts/euclid-circular-b/semibold-italic.ttf', weight: '600' },
    { path: '../fonts/euclid-circular-b/bold.ttf', weight: '700' },
    { path: '../fonts/euclid-circular-b/bold-italic.ttf', weight: '700' }
  ],
  preload: true,
  variable: '--font-euclid-circular-b'
})

export const JetbrainsMono = localfont({
  src: [
    { weight: '100', path: '../fonts/jetbrains-mono/JetbrainsMono-Thin.ttf' },
    {
      weight: '100',
      path: '../fonts/jetbrains-mono/JetbrainsMono-ThinItalic.ttf'
    },
    {
      weight: '200',
      path: '../fonts/jetbrains-mono/JetbrainsMono-ExtraLight.ttf'
    },
    {
      weight: '200',
      path: '../fonts/jetbrains-mono/JetbrainsMono-ExtraLightItalic.ttf'
    },
    { weight: '300', path: '../fonts/jetbrains-mono/JetbrainsMono-Light.ttf' },
    {
      weight: '300',
      path: '../fonts/jetbrains-mono/JetbrainsMono-LightItalic.ttf'
    },
    {
      weight: '400',
      path: '../fonts/jetbrains-mono/JetbrainsMono-Regular.ttf'
    },
    {
      weight: '400',
      path: '../fonts/jetbrains-mono/JetbrainsMono-Italic.ttf'
    },
    { weight: '500', path: '../fonts/jetbrains-mono/JetbrainsMono-Medium.ttf' },
    {
      weight: '500',
      path: '../fonts/jetbrains-mono/JetbrainsMono-MediumItalic.ttf'
    },
    {
      weight: '600',
      path: '../fonts/jetbrains-mono/JetbrainsMono-SemiBold.ttf'
    },
    {
      weight: '600',
      path: '../fonts/jetbrains-mono/JetbrainsMono-SemiBoldItalic.ttf'
    },
    { weight: '700', path: '../fonts/jetbrains-mono/JetbrainsMono-Bold.ttf' },
    {
      weight: '700',
      path: '../fonts/jetbrains-mono/JetbrainsMono-BoldItalic.ttf'
    },
    {
      weight: '800',
      path: '../fonts/jetbrains-mono/JetbrainsMono-ExtraBold.ttf'
    },
    {
      weight: '800',
      path: '../fonts/jetbrains-mono/JetbrainsMono-ExtraBoldItalic.ttf'
    }
  ],
  preload: true,
  variable: '--font-jetbrains-mono'
})

export const Lobster = localfont({
  src: [
    { path: '../fonts/lobster/lobster-regular.ttf', weight: '400' },
    { path: '../fonts/lobster/lobster-italic.ttf', weight: '400' },
    { path: '../fonts/lobster/lobster-bold.ttf', weight: '700' },
    { path: '../fonts/lobster/lobster-boldItalic.ttf', weight: '700' }
  ],
  preload: true,
  variable: '--font-lobster'
})

export const Comfortaa = localfont({
  src: [{ path: '../fonts/comfortaa.ttf' }],
  preload: true,
  variable: '--font-comfortaa'
})
