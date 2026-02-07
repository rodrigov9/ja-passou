import { ViewProps } from 'react-native'
import Animated from 'react-native-reanimated'

export function Skeleton({ style, ...props }: ViewProps) {
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
      {...props}
    />
  )
}
