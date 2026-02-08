import { ViewProps } from 'react-native'
import Animated from 'react-native-reanimated'
import { cn } from '@/utils/cn'

export function Skeleton({ style, className, ...props }: ViewProps) {
  return (
    <Animated.View
      style={[
        {
          animationName: {
            '50%': {
              opacity: 0.5
            }
          },
          animationDuration: '2s',
          animationTimingFunction: 'ease-in-out'
        },
        style
      ]}
      className={cn('bg-muted', className)}
      {...props}
    />
  )
}
