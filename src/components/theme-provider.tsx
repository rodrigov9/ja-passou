import { ReactNode } from 'react'
import {
  ThemeProvider as NavigationThemeProvider,
  DefaultTheme,
  DarkTheme
} from '@react-navigation/native'

import { useCSSVariable, useUniwind } from 'uniwind'

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useUniwind()
  const [
    primaryColor,
    backgroundColor,
    borderColor,
    textColor,
    cardColor,
    notificationColor
  ] = useCSSVariable([
    '--color-primary',
    '--color-background',
    '--color-border',
    '--color-card-foreground',
    '--color-card',
    '--color-destructive'
  ]) as string[]

  return (
    <NavigationThemeProvider
      value={{
        ...(theme === 'dark' ? DarkTheme : DefaultTheme),
        colors: {
          primary: primaryColor,
          background: backgroundColor,
          border: borderColor,
          text: textColor,
          card: cardColor,
          notification: notificationColor
        }
      }}
    >
      {children}
    </NavigationThemeProvider>
  )
}
