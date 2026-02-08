import { SafeAreaListener } from 'react-native-safe-area-context'
import { QueryProvider } from '@/components/query-provider'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { Uniwind } from 'uniwind'
import { ThemeProvider } from '@/components/theme-provider'
import '../global.css'

export default function RootLayout() {
  return (
    <SafeAreaListener
      onChange={({ insets }) => {
        Uniwind.updateInsets(insets)
      }}
    >
      <QueryProvider>
        <ThemeProvider>
          <Stack />
        </ThemeProvider>

        <StatusBar style="auto" />
      </QueryProvider>
    </SafeAreaListener>
  )
}
