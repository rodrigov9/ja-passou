import { memo } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Link } from 'expo-router'

import { ServiceCardHeader } from './service-card-header'
import { ServiceTime } from './service-time'
import { ServiceInfo } from './service-info'

import { StyledIcon } from '../styled-icon'
import { ChevronRightIcon } from 'lucide-react-native'

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
    <Link
      href={{
        pathname: '/services/[serviceId]',
        params: {
          serviceId: service.id,
          date: service.date.format('YYYY-MM-DD'),
          placeholderData: JSON.stringify({
            id: service.id,
            operator: service.operator,
            type: service.type,
            origin: service.origin.name,
            destination: service.destination.name,
            status: service.status,
            delay: service.delay,
            departureTime: service.date
          })
        }
      }}
      asChild
    >
      <TouchableOpacity className="flex-row items-center gap-4 rounded-xl border border-border bg-card p-4">
        <View className="flex-1 gap-2">
          <ServiceCardHeader service={service} />

          {showOrigin ? (
            <Text className="text-card-foreground">
              Origem <Text className="font-bold">{service.origin.name}</Text>
            </Text>
          ) : (
            <Text className="text-card-foreground">
              Destino{' '}
              <Text className="font-bold">{service.destination.name}</Text>
            </Text>
          )}

          <ServiceTime
            status={service.status}
            scheduledTime={service.date}
            ETA={service.ETA}
          />

          {service.status === ServiceStatus.CANCELLED ? (
            <ServiceInfo>Suprimido</ServiceInfo>
          ) : service.delay ? (
            <ServiceInfo>
              Comboio atrasado ({formatDuration(service.delay)})
            </ServiceInfo>
          ) : null}
        </View>

        <StyledIcon
          icon={ChevronRightIcon}
          className="size-6 accent-card-foreground"
        />
      </TouchableOpacity>
    </Link>
  )
})
