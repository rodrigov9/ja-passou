import { ExpoConfig } from 'expo/config'

let appId = 'dev.rvitorino.japassou'
let appName = 'Já Passou?'
let appScheme = 'japassou'
let iconsFolder = ''

if (process.env.APP_VARIANT === 'development') {
  appId += '.debug'
  appName += ' (Debug)'
  appScheme += '-debug'
  iconsFolder = 'debug/'
}

export default {
  name: appName,
  slug: 'japassou',
  scheme: appScheme,
  version: '1.0.0',
  orientation: 'portrait',
  icon: `./assets/${iconsFolder}icon.png`,
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    icon: {
      light: `./assets/${iconsFolder}icon-light.png`,
      dark: `./assets/${iconsFolder}icon-dark.png`,
      tinted: `./assets/${iconsFolder}icon-tinted.png`
    },
    supportsTablet: true
  },
  android: {
    package: appId,
    adaptiveIcon: {
      foregroundImage: `./assets/${iconsFolder}adaptive-icon.png`,
      backgroundImage: `./assets/adaptive-icon-background.png`,
      monochromeImage: `./assets/${iconsFolder}adaptive-icon-monochrome.png`
    },
    predictiveBackGestureEnabled: false
  },
  plugins: [
    [
      'expo-splash-screen',
      {
        image: './assets/splash-icon-light.png',
        backgroundColor: '#06b6d4',
        dark: {
          image: './assets/splash-icon-dark.png',
          backgroundColor: '#0a0a0a'
        },
        imageWidth: 200
      }
    ],
    'expo-router'
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    eas: {
      projectId: '3d2cd5fa-25c2-48a7-89b5-4dd48bc8cfaa'
    }
  }
} satisfies ExpoConfig
