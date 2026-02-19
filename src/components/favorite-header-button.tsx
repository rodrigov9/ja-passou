import { useTheme } from '@react-navigation/native'
import { HeaderButton } from '@react-navigation/elements'

import { useFavorites } from '@/hooks/useFavorites'

import { StyledIcon } from './styled-icon'
import { StarIcon } from 'lucide-react-native'

type FavoriteHeaderButtonProps = {
  stationId: number
  stationName?: string
}

export function FavoriteHeaderButton({
  stationId,
  stationName
}: FavoriteHeaderButtonProps) {
  const {
    colors: { text: tintColor }
  } = useTheme()

  const { toggleFavorite, isFavorite } = useFavorites()
  const isChecked = isFavorite(stationId)

  return (
    <HeaderButton
      accessibilityLabel={
        isChecked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
      }
      onPress={() =>
        stationName && toggleFavorite({ id: stationId, name: stationName })
      }
      disabled={!stationName}
      style={{ height: 48 }}
    >
      <StyledIcon
        icon={StarIcon}
        color={tintColor}
        className="size-6"
        fill={isChecked ? tintColor : undefined}
      />
    </HeaderButton>
  )
}
