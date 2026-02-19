import { useMMKVObject } from 'react-native-mmkv'

type Favorite = {
  id: number
  name: string
}

export function useFavorites() {
  const [favorites, setFavorites] = useMMKVObject<Favorite[]>('favorites')

  function toggleFavorite(station: Favorite) {
    setFavorites(prev =>
      prev?.some(s => s.id === station.id)
        ? prev.filter(s => s.id !== station.id)
        : [...(prev ?? []), station]
    )
  }

  function isFavorite(stationId: Favorite['id']) {
    return favorites?.some(fav => fav.id === stationId) ?? false
  }

  return { favorites, toggleFavorite, isFavorite, setFavorites }
}
