import { Text, View } from 'react-native'
import { StyledIcon } from '../styled-icon'
import { ClockIcon, CheckIcon, XIcon } from 'lucide-react-native'

import { Dayjs } from 'dayjs'
import { ServiceStatus } from '@/lib/ip/service-status'

type ServiceTimeProps = {
  status: ServiceStatus
  scheduledTime: Dayjs
  ETA: Dayjs | null
}

export function ServiceTime({ status, scheduledTime, ETA }: ServiceTimeProps) {
  return (
    <View className="flex-row items-center gap-2">
      {status === ServiceStatus.CANCELLED ? (
        <StyledIcon icon={XIcon} className="size-5 accent-red-800" />
      ) : ETA ? (
        <StyledIcon icon={ClockIcon} className="size-5 accent-red-600" />
      ) : (
        <StyledIcon icon={CheckIcon} className="size-5 accent-green-800" />
      )}

      {ETA && (
        <Text className="text-card-foreground line-through">
          {scheduledTime.format('HH:mm')}
        </Text>
      )}

      <Text className="text-card-foreground">
        {(ETA ?? scheduledTime).format('HH:mm')}
      </Text>
    </View>
  )
}
