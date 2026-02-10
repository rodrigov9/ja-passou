import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Stack, Link } from 'expo-router'
import { Input } from '@/components/input'
import { Spinner } from '@/components/spinner'

import { useStationSearch } from '@/hooks/useStationSearch'

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
          selectTextOnFocus
        />

        <Spinner
          className="absolute inset-y-1 right-3"
          animating={isFetching}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.select({ android: 'height', default: 'padding' })}
      >
        <ScrollView
          contentContainerClassName="gap-2 py-4"
          keyboardShouldPersistTaps="handled"
        >
          {data?.map(station => (
            <Link
              key={station.id}
              href={{
                pathname: '/stations/[stationId]/departures',
                params: {
                  stationId: station.id,
                  stationName: station.name
                }
              }}
              asChild
            >
              <TouchableOpacity>
                <Text className="text-foreground">{station.name}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
