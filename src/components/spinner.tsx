import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import { useResolveClassNames } from 'uniwind'

export function Spinner({ colorClassName, ...props }: ActivityIndicatorProps) {
  const { accentColor } = useResolveClassNames(
    colorClassName ?? 'android:accent-primary'
  )

  return <ActivityIndicator color={accentColor} {...props} />
}
