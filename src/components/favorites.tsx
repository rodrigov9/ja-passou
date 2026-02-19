import { useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import DraggableFlatList, {
  ScaleDecorator
} from 'react-native-draggable-flatlist'

import { StyledIcon } from './styled-icon'
import {
  StarIcon,
  PencilLineIcon,
  CheckIcon,
  XIcon,
  MenuIcon
} from 'lucide-react-native'

import { useFavorites } from '@/hooks/useFavorites'
import { StationListItem } from './station-list-item'
import { Separator } from './separator'

export function Favorites() {
  const { favorites, toggleFavorite, setFavorites } = useFavorites()
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <DraggableFlatList
      data={favorites ?? []}
      keyExtractor={(station, index) => `${station.id}-${index}`}
      keyboardShouldPersistTaps="handled"
      className="overflow-visible"
      contentContainerClassName="py-3"
      ListHeaderComponentClassName="flex-row items-center gap-2 py-1"
      ListHeaderComponent={
        <>
          <StyledIcon
            icon={StarIcon}
            className="size-3 fill-foreground accent-foreground"
          />

          <Text className="font-bold text-foreground">Favoritos</Text>

          {favorites?.length ? (
            <TouchableOpacity
              className="absolute -inset-y-1 right-0 aspect-square items-center justify-center"
              onPress={() => setIsEditMode(prev => !prev)}
            >
              <StyledIcon
                icon={isEditMode ? CheckIcon : PencilLineIcon}
                className="size-3 accent-foreground"
                accessibilityLabel="Editar favoritos"
              />
            </TouchableOpacity>
          ) : null}
        </>
      }
      ListEmptyComponent={
        <Text className="text-muted-foreground">
          Adicione estações aos favoritos para um acesso mais rápido
        </Text>
      }
      ItemSeparatorComponent={isEditMode ? undefined : Separator}
      onDragEnd={({ data }) => setFavorites(data)}
      renderItem={
        isEditMode
          ? ({ item: station, drag, isActive }) => (
              <ScaleDecorator>
                <Pressable onPressIn={drag} disabled={isActive}>
                  <View className="flex-row items-center gap-2 border-b border-transparent py-2">
                    <StyledIcon
                      icon={MenuIcon}
                      className="size-3 accent-foreground"
                    />

                    <Text className="text-foreground">{station.name}</Text>

                    <TouchableOpacity
                      className="absolute inset-y-0 right-0 aspect-square items-center justify-center"
                      onPress={() => toggleFavorite(station)}
                    >
                      <StyledIcon
                        icon={XIcon}
                        className="size-3 accent-foreground"
                        accessibilityLabel="Remover favorito"
                      />
                    </TouchableOpacity>
                  </View>
                </Pressable>
              </ScaleDecorator>
            )
          : StationListItem
      }
    />
  )
}
