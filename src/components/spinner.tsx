import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import { useResolveClassNames } from 'uniwind'

export function Spinner(props: ActivityIndicatorProps) {
  const { color } = useResolveClassNames('android:text-primary')

  return <ActivityIndicator color={color} {...props} />
}
