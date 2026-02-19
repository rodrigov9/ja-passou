import { View, ViewProps } from 'react-native'
import { cn } from '@/utils/cn'

export function Separator({ className, ...props }: ViewProps) {
  return <View className={cn('h-px bg-border', className)} {...props} />
}
