import { useLocalSearchParams } from 'expo-router'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getService } from '@/lib/ip/get-service'

import { dayjs } from '@/lib/dayjs'

export function serviceQueryOptions(
  serviceId: string,
  date = dayjs().format('YYYY-MM-DD')
) {
  return queryOptions({
    queryKey: ['service', serviceId, date],
    queryFn: ({ signal }) => getService({ id: serviceId, date }, { signal }),
    refetchInterval: 1 * 60 * 1000 // 1 minute
  })
}

export function useService() {
  const { serviceId, date } = useLocalSearchParams<
    '/services/[serviceId]',
    { date?: string }
  >()

  return useQuery(serviceQueryOptions(serviceId, date))
}
