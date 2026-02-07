import { ReactNode } from 'react'
import { Text, View } from 'react-native'
import { StyledIcon } from '../styled-icon'
import { InfoIcon } from 'lucide-react-native'

type ServiceInfoProps = {
  children: ReactNode
}

export function ServiceInfo({ children }: ServiceInfoProps) {
  return (
    <View className="flex-row items-center gap-1 opacity-50">
      <StyledIcon icon={InfoIcon} className="size-4" />
      <Text className="text-xs">{children}</Text>
    </View>
  )
}
