import { Stack, withLayoutContext, useLocalSearchParams } from 'expo-router'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap
} from '@react-navigation/material-top-tabs'
import { ParamListBase, TabNavigationState } from '@react-navigation/native'

import { useStation, StationProvider } from '@/hooks/useStation'

import { FavoriteHeaderButton } from '@/components/favorite-header-button'

const { Navigator } = createMaterialTopTabNavigator()

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator)

export default function StationLayout() {
  const params = useLocalSearchParams<
    '/stations/[stationId]/departures',
    { stationName?: string }
  >()
  const stationId = parseInt(params.stationId)
  const { data, refetch, isFetching } = useStation(stationId)
  const stationName = data?.name ?? params.stationName

  return (
    <StationProvider value={{ stationId }}>
      <Stack.Screen
        options={{
          title: stationName ?? 'A carregar...',
          headerShadowVisible: false,
          headerRight: () => (
            <FavoriteHeaderButton
              stationId={stationId}
              stationName={stationName}
            />
          )
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
