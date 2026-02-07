import { Stack, withLayoutContext, useLocalSearchParams } from 'expo-router'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap
} from '@react-navigation/material-top-tabs'
import { ParamListBase, TabNavigationState } from '@react-navigation/native'

import { useStation, StationProvider } from '@/hooks/useStation'

const { Navigator } = createMaterialTopTabNavigator()

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator)

export default function StationLayout() {
  const { stationId, stationName } = useLocalSearchParams<
    '/stations/[stationId]/departures',
    { stationName?: string }
  >()
  const { data, refetch, isFetching } = useStation(stationId)

  return (
    <StationProvider value={{ stationId }}>
      <Stack.Screen
        options={{
          title: data?.name ?? stationName ?? 'A carregar...',
          headerShadowVisible: false
        }}
      />

      <MaterialTopTabs
        backBehavior="none"
        screenListeners={({ navigation }) => ({
          tabPress: () => {
            if (navigation.isFocused() && !isFetching) {
              refetch()
            }
          }
        })}
      >
        <MaterialTopTabs.Screen
          name="departures"
          options={{
            title: 'Partidas'
          }}
        />

        <MaterialTopTabs.Screen
          name="arrivals"
          options={{
            title: 'Chegadas'
          }}
        />
      </MaterialTopTabs>
    </StationProvider>
  )
}
