import { Text, ScrollView, View } from 'react-native'
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
import { Spinner } from '@/components/spinner'

import { dayjs } from '@/lib/dayjs'
import { useService } from '@/hooks/useService'
import { ServiceStatus } from '@/lib/ip/service-status'
import { formatDuration } from '@/utils/format-duration'

export default function Service() {
  const { placeholderData } = useLocalSearchParams<{
    placeholderData?: string
  }>()
  const { data, isPending, isRefetching } = useService()
  const headerTitleStyle = useResolveClassNames(
    'font-bold text-lg text-foreground'
  )

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
                  delay:
                    parsedPlaceholderData.delay &&
                    dayjs.duration(parsedPlaceholderData.delay)
                } as Exclude<typeof d, undefined>
              }

              return (
                <View className="gap-4 py-4">
                  <View className="flex-row flex-wrap items-center gap-x-4">
                    <Text className="text-center text-lg font-bold text-foreground">
                      {d.origin}
                    </Text>

                    <StyledIcon
                      icon={MoveRightIcon}
                      className="size-6 accent-foreground"
                    />

                    <Text className="text-center text-lg font-bold text-foreground">
                      {d.destination}
                    </Text>
                  </View>

                  <View className="gap-1">
                    <Text className="text-xs text-foreground">
                      {d.departureTime.format('dddd, D [de] MMMM')}
                    </Text>

                    <ServiceCardHeader service={d} />
                  </View>

                  {d.status === ServiceStatus.CANCELLED ? (
                    <ServiceInfo>Suprimido</ServiceInfo>
                  ) : d.delay ? (
                    <ServiceInfo>
                      Comboio atrasado ({formatDuration(d.delay)})
                    </ServiceInfo>
                  ) : null}
                </View>
              )
            })
        }}
      />

      <Spinner className="absolute top-2 right-2" animating={isRefetching} />

      {isPending || !data ? (
        <View className="flex-1 items-center justify-center">
          <Spinner size="large" />
        </View>
      ) : (
        <ScrollView contentContainerClassName="p-safe-or-6 pt-6">
          {data.stops.map((stop, i) => {
            const isOrigin = i === 0
            const isDestination = i === data.stops.length - 1

            return (
              <View key={stop.station.id} className="flex-row gap-4">
                {isOrigin || isDestination || !stop.hasPassed ? (
                  <Text className="w-24 text-right text-base text-foreground">
                    {stop.ETA && (
                      <Text className="line-through">
                        {stop.scheduledTime.format('HH:mm')}
                      </Text>
                    )}{' '}
                    {(stop.ETA ?? stop.scheduledTime).format('HH:mm')}
                  </Text>
                ) : (
                  <View className="w-24" />
                )}

                <View className="items-center">
                  <StyledIcon
                    icon={stop.hasPassed ? CircleDotIcon : CircleDotDashedIcon}
                    className={`size-5 ${data.status === ServiceStatus.CANCELLED ? 'accent-red-800' : stop.hasPassed ? 'accent-green-800' : 'accent-muted-foreground'}`}
                  />

                  {!isDestination && (
                    <View
                      className={`h-8 border-l ${data.status === ServiceStatus.CANCELLED ? 'border-red-800' : stop.hasPassed ? 'border-green-800' : 'border-muted-foreground'} ${data.stops[i + 1].hasPassed ? 'border-solid' : 'border-dashed'}`}
                    />
                  )}
                </View>

                <Text className="text-base text-foreground">
                  {stop.station.name}
                </Text>
              </View>
            )
          })}
        </ScrollView>
      )}
    </>
  )
}
