import { SafeAreaListener } from 'react-native-safe-area-context'
import { QueryProvider } from '@/components/query-provider'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { Uniwind } from 'uniwind'
import '../global.css'

export default function RootLayout() {
  return (
    <SafeAreaListener
      onChange={({ insets }) => {
        Uniwind.updateInsets(insets)
      }}
    >
      <QueryProvider>
        <Stack />

        <StatusBar style="auto" />
      </QueryProvider>
    </SafeAreaListener>
  )
}
