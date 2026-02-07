import { memo } from 'react'
import { Text, View } from 'react-native'

import { ServiceCardHeader } from './service-card-header'
import { ServiceTime } from './service-time'
import { ServiceInfo } from './service-info'

import { ServiceData } from '@/lib/ip/get-station'
import { ServiceStatus } from '@/lib/ip/service-status'
import { formatDuration } from '@/utils/format-duration'

type ServiceCardProps = {
  service: ServiceData
  showOrigin?: boolean
}

export const ServiceCard = memo(function ServiceCard({
  service,
  showOrigin
}: ServiceCardProps) {
  return (
    <View className="gap-2 rounded-xl border p-4">
      <ServiceCardHeader service={service} />

      {showOrigin ? (
        <Text>
          Origem <Text className="font-bold">{service.origin.name}</Text>
        </Text>
      ) : (
        <Text>
          Destino <Text className="font-bold">{service.destination.name}</Text>
        </Text>
      )}

      <ServiceTime
        status={service.status}
        scheduledTime={service.date}
        delay={service.delay}
      />

      {service.status === ServiceStatus.CANCELLED ? (
        <ServiceInfo>Suprimido</ServiceInfo>
      ) : service.delay.asMinutes() > 0 ? (
        <ServiceInfo>
          Comboio atrasado ({formatDuration(service.delay)})
        </ServiceInfo>
      ) : null}
    </View>
  )
})
