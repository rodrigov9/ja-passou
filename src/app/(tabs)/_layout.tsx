import { Tabs, Stack } from 'expo-router'

import { StyledIcon } from '@/components/styled-icon'
import { SearchIcon, TrainIcon } from 'lucide-react-native'

export default function TabsLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Estações',
            tabBarIcon: ({ color, size }) => (
              <StyledIcon icon={SearchIcon} color={color} size={size} />
            )
          }}
        />

        <Tabs.Screen
          name="services"
          options={{
            title: 'Comboios',
            tabBarIcon: ({ color, size }) => (
              <StyledIcon icon={TrainIcon} color={color} size={size} />
            )
          }}
        />
      </Tabs>
    </>
  )
}
