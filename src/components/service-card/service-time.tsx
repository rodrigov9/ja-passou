import { Text, View } from 'react-native'
import { StyledIcon } from '../styled-icon'
import { ClockIcon, CheckIcon, XIcon } from 'lucide-react-native'

import { Dayjs } from 'dayjs'
import { Duration } from 'dayjs/plugin/duration'
import { ServiceStatus } from '@/lib/ip/service-status'

type ServiceTimeProps = {
  status: ServiceStatus
  scheduledTime: Dayjs
  delay: Duration
}

export function ServiceTime({
  status,
  scheduledTime,
  delay
}: ServiceTimeProps) {
  const estimated = scheduledTime.add(delay)
  const hasDelay = delay.asMinutes() > 0

  return (
    <View className="flex-row items-center gap-2">
      {status === ServiceStatus.CANCELLED ? (
        <StyledIcon icon={XIcon} className="size-5 accent-red-800" />
      ) : hasDelay ? (
        <StyledIcon icon={ClockIcon} className="size-5 accent-red-600" />
      ) : (
        <StyledIcon icon={CheckIcon} className="size-5 accent-green-800" />
      )}

      {hasDelay && (
        <Text className="line-through">{scheduledTime.format('HH:mm')}</Text>
      )}

      <Text>{estimated.format('HH:mm')}</Text>
    </View>
  )
}
