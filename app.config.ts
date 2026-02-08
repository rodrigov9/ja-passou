import { ExpoConfig } from 'expo/config'

const IS_DEV = process.env.APP_VARIANT === 'development'

export default {
  name: IS_DEV ? 'Comboios (Dev)' : 'Comboios',
  slug: 'comboios',
  scheme: 'comboios',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: IS_DEV ? 'com.rodrigov9.comboios.dev' : 'com.rodrigov9.comboios'
  },
  web: {
    favicon: './assets/favicon.png'
  },
  plugins: ['expo-router'],
  experiments: {
    typedRoutes: true
  },
  extra: {
    eas: {
      projectId: '704abdb6-a388-4fd2-9e7e-0fead1539989'
    }
  }
} satisfies ExpoConfig
