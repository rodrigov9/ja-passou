import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { Stack } from 'expo-router'
import { Input } from '@/components/input'
import { Spinner } from '@/components/spinner'
import { Separator } from '@/components/separator'

import { StyledIcon } from '@/components/styled-icon'
import { XIcon } from 'lucide-react-native'

import { useStationSearch } from '@/hooks/useStationSearch'
import { Favorites } from '@/components/favorites'
import { StationListItem } from '@/components/station-list-item'

export default function Home() {
  const [name, setName] = useState('')
  const { data, isFetching } = useStationSearch(name)

  return (
    <View className="p-safe-offset-6">
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-row">
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

      <KeyboardAvoidingView
        behavior={Platform.select({ android: 'height', default: 'padding' })}
      >
        {!name ? (
          <Favorites />
        ) : (
          <FlatList
            data={data ?? []}
            keyExtractor={station => String(station.id)}
            keyboardShouldPersistTaps="handled"
            contentContainerClassName="py-2"
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
    </View>
  )
}
