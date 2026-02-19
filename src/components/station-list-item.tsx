import { Text, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'

type StationListItemProps = {
  item: {
    id: number | string
    name: string
  }
}

export function StationListItem({ item: station }: StationListItemProps) {
  return (
    <Link
      href={{
        pathname: '/stations/[stationId]/departures',
        params: {
          stationId: station.id,
          stationName: station.name
        }
      }}
      asChild
    >
      <TouchableOpacity className="py-2">
        <Text className="text-foreground">{station.name}</Text>
      </TouchableOpacity>
    </Link>
  )
}
