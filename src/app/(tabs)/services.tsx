import { useEffect, useRef, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Input } from '@/components/input'
import { Spinner } from '@/components/spinner'
import { DatePicker } from '@/components/date-picker'

import { useQueryClient } from '@tanstack/react-query'
import { serviceQueryOptions } from '@/hooks/useService'
import { dayjs } from '@/lib/dayjs'

import { StyledIcon } from '@/components/styled-icon'
import { ChevronRightIcon, HashIcon } from 'lucide-react-native'

export default function Services() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [serviceId, setServiceId] = useState('')
  const [date, setDate] = useState(new Date())

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<TextInput>(null)

  async function handleSearch() {
    if (!serviceId || error) return

    inputRef.current?.blur()

    setIsLoading(true)
    setError(null)

    const dateString = dayjs(date).format('YYYY-MM-DD')

    try {
      await queryClient.ensureQueryData(
        serviceQueryOptions(serviceId, dateString)
      )
      router.push({
        pathname: '/services/[serviceId]',
        params: { serviceId, date: dateString }
      })
    } catch {
      setError('Não foi encontrado nenhum comboio com os dados fornecidos.')
      inputRef.current?.focus()
    }

    setIsLoading(false)
  }

  useEffect(() => setError(null), [serviceId, date])

  return (
    <View className="flex-1 items-center justify-center gap-4 p-6">
      <View className="w-60 gap-2">
        <View className="flex-row items-center">
          <Input
            inputMode="numeric"
            returnKeyType="go"
            className="pl-9"
            placeholder="Número do comboio"
            maxLength={5}
            ref={inputRef}
            value={serviceId}
            onChangeText={text => setServiceId(text.replace(/[^0-9]/g, ''))}
            onSubmitEditing={handleSearch}
            submitBehavior="submit"
          />

          <View className="absolute left-3">
            <StyledIcon icon={HashIcon} className="size-4 accent-foreground" />
          </View>
        </View>

        <DatePicker value={date} onChange={setDate} />

        <TouchableOpacity
          className="items-center justify-center rounded-xl bg-primary p-2 disabled:opacity-70"
          onPress={handleSearch}
          disabled={isLoading || !!error || !serviceId}
        >
          {isLoading ? (
            <Spinner
              className="size-6"
              colorClassName="accent-primary-foreground"
            />
          ) : (
            <StyledIcon
              icon={ChevronRightIcon}
              className="size-6 accent-primary-foreground"
              accessibilityLabel="Pesquisar"
            />
          )}
        </TouchableOpacity>
      </View>

      {error && <Text className="text-center text-destructive">{error}</Text>}
    </View>
  )
}
