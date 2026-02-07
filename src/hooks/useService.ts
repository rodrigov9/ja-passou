import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getService } from '@/lib/ip/get-service'

import { dayjs } from '@/lib/dayjs'

export function useService() {
  const { serviceId, date = dayjs().format('YYYY-MM-DD') } =
    useLocalSearchParams<'/services/[serviceId]', { date?: string }>()

  return useQuery({
    queryKey: ['service', serviceId, date],
    queryFn: ({ signal }) => getService({ id: serviceId, date }, { signal }),
    refetchInterval: 1 * 60 * 1000 // 1 minute
  })
}
