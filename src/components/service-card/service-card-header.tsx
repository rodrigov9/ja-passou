import { Text, View } from 'react-native'
import { StyledIcon } from '../styled-icon'
import { TrainIcon } from 'lucide-react-native'

type ServiceCardHeaderProps = {
  service: {
    id: number
    operator: string
    type: string
  }
}

export function ServiceCardHeader({ service }: ServiceCardHeaderProps) {
  return (
    <View className="flex-row items-center gap-1">
      <StyledIcon icon={TrainIcon} className="size-4 accent-card-foreground" />
      <Text className="text-xs text-card-foreground">
        {service.id} | {service.operator} | {service.type}
      </Text>
    </View>
  )
}
