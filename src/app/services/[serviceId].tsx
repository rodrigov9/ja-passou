import { Text, ScrollView, View, ActivityIndicator } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'

import { useResolveClassNames } from 'uniwind'
import { StyledIcon } from '@/components/styled-icon'
import {
  MoveRightIcon,
  CircleDotIcon,
  CircleDotDashedIcon
} from 'lucide-react-native'
import { ServiceCardHeader } from '@/components/service-card/service-card-header'
import { ServiceInfo } from '@/components/service-card/service-info'

import { dayjs } from '@/lib/dayjs'
import { useService } from '@/hooks/useService'
import { ServiceStatus } from '@/lib/ip/service-status'
import { formatDuration } from '@/utils/format-duration'

export default function Service() {
  const { placeholderData } = useLocalSearchParams<{
    placeholderData?: string
  }>()
  const { data, isPending, isFetching } = useService()
  const headerTitleStyle = useResolveClassNames('font-bold text-lg')

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Detalhes do comboio',
          headerTitleStyle: headerTitleStyle as any,
          headerTitle:
            (data || placeholderData) &&
            (() => {
              let d = data

              if (!d) {
                const parsedPlaceholderData = JSON.parse(placeholderData!)
                d = {
                  ...parsedPlaceholderData,
                  departureTime: dayjs(parsedPlaceholderData.departureTime),
                  delay: dayjs.duration(parsedPlaceholderData.delay)
                } as Exclude<typeof d, undefined>
              }

              return (
                <View className="gap-4 py-4">
                  <View className="flex-row flex-wrap items-center gap-x-4">
                    <Text className="text-center text-lg font-bold">
                      {d.origin}
                    </Text>

                    <StyledIcon icon={MoveRightIcon} />

                    <Text className="text-center text-lg font-bold">
                      {d.destination}
                    </Text>
                  </View>

                  <View className="gap-1">
                    <Text className="text-xs">
                      {d.departureTime.format('dddd, D [de] MMMM')}
                    </Text>

                    <ServiceCardHeader service={d} />
                  </View>

                  {d.status === ServiceStatus.CANCELLED ? (
                    <ServiceInfo>Suprimido</ServiceInfo>
                  ) : d.delay.asMinutes() > 0 ? (
                    <ServiceInfo>
                      Comboio atrasado ({formatDuration(d.delay)})
                    </ServiceInfo>
                  ) : null}
                </View>
              )
            })
        }}
      />

      {isPending || !data ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView contentContainerClassName="p-safe-or-6 pt-6">
          <ActivityIndicator
            className="absolute top-2 right-2"
            animating={isFetching}
          />

          {data.stops.map((stop, i) => {
            const isDestination = i === data.stops.length - 1

            return (
              <View key={stop.station.id} className="flex-row gap-4">
                <Text className="w-24 text-right text-base">
                  {stop.ETA && (
                    <Text className="line-through">
                      {stop.scheduledTime.format('HH:mm')}
                    </Text>
                  )}{' '}
                  {(stop.ETA ?? stop.scheduledTime).format('HH:mm')}
                </Text>

                <View className="items-center">
                  <StyledIcon
                    icon={stop.hasPassed ? CircleDotIcon : CircleDotDashedIcon}
                    className={`size-5 ${data.status === ServiceStatus.CANCELLED ? 'accent-red-800' : stop.hasPassed ? 'accent-green-800' : 'accent-neutral-400'}`}
                  />

                  {!isDestination && (
                    <View
                      className={`h-8 border-l ${data.status === ServiceStatus.CANCELLED ? 'border-red-800' : stop.hasPassed ? 'border-green-800' : 'border-neutral-400'} ${data.stops[i + 1].hasPassed ? 'border-solid' : 'border-dashed'}`}
                    />
                  )}
                </View>

                <Text className="text-base">{stop.station.name}</Text>
              </View>
            )
          })}
        </ScrollView>
      )}
    </>
  )
}
