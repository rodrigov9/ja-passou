import { useCallback, useState } from 'react'
import {
  KeyboardAvoidingView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  BackHandler
} from 'react-native'
import { useFocusEffect } from 'expo-router'
import { Input } from '@/components/input'
import { Spinner } from '@/components/spinner'
import { Separator } from '@/components/separator'

import { StyledIcon } from '@/components/styled-icon'
import { XIcon } from 'lucide-react-native'

import { useStationSearch } from '@/hooks/useStationSearch'
import { Favorites } from '@/components/favorites'
import { StationListItem } from '@/components/station-list-item'

export default function Stations() {
  const [name, setName] = useState('')
  const { data, isFetching } = useStationSearch(name)

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          if (name) {
            setName('')
            return true
          }

          return false
        }
      )

      return () => subscription.remove()
    }, [name])
  )

  return (
    <KeyboardAvoidingView
      className="flex-1 pt-safe-offset-6"
      behavior="padding"
    >
      <View className="mx-6 flex-row">
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Procurar estações"
          returnKeyType="search"
          className="pr-10"
        />

        {isFetching ? (
          <Spinner className="absolute inset-y-1 right-3" />
        ) : name ? (
          <TouchableOpacity
            onPress={() => setName('')}
            className="absolute inset-y-0 right-0 justify-center px-3.5"
          >
            <StyledIcon icon={XIcon} className="size-4 accent-foreground" />
          </TouchableOpacity>
        ) : null}
      </View>

      {!name ? (
        <Favorites />
      ) : (
        <FlatList
          data={data ?? []}
          keyExtractor={station => String(station.id)}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="px-6 py-2"
          renderItem={StationListItem}
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={
            !isFetching ? (
              <Text className="text-foreground">
                Nenhuma estação encontrada
              </Text>
            ) : null
          }
        />
      )}
    </KeyboardAvoidingView>
  )
}
