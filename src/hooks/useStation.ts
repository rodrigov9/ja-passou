import { createContext, useContext, useRef, useState } from 'react'
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { getStation } from '@/lib/ip/get-station'
import { dayjs } from '@/lib/dayjs'

function mergeArrays<T>(original: T[], updates: T[], key: keyof T): T[] {
  const map = new Map([...original, ...updates].map(item => [item[key], item]))
  return Array.from(map.values())
}

type FetchOptions = Parameters<typeof getStation>[1] & {
  oldData?: Awaited<ReturnType<typeof getStation>>
}

async function loadStationData(
  stationId: number,
  { oldData, ...options }: FetchOptions = {},
  attempt = 0
) {
  let start = oldData?.nextFetchStart
  let hours = 1

  if (!start) {
    start = dayjs().subtract(10, 'hours')
    hours = 11
  } else if (attempt > 0) {
    hours = 12
  }

  const newData = await getStation({ stationId, start, hours }, options)

  const oldDepartures = oldData?.departures ?? []
  const departures = mergeArrays(oldDepartures, newData.departures, 'key')

  const oldArrivals = oldData?.arrivals ?? []
  const arrivals = mergeArrays(oldArrivals, newData.arrivals, 'key')

  const accumulatedData = { ...newData, departures, arrivals }

  if (
    attempt < 5 &&
    (departures.length === oldDepartures.length ||
      arrivals.length === oldArrivals.length)
  ) {
    return loadStationData(
      stationId,
      { ...options, oldData: accumulatedData },
      attempt + 1
    )
  }

  return accumulatedData
}

export const stationContext = createContext<{ stationId: number } | null>(null)
export const StationProvider = stationContext.Provider

export function useStation(stationIdOverride?: number) {
  const ctx = useContext(stationContext)
  const stationId = stationIdOverride ?? ctx?.stationId

  if (!stationId)
    throw new Error(
      'useStation must be used within a StationProvider or a stationId must be provided'
    )

  const queryClient = useQueryClient()
  const loadMoreDataSignal = useRef<AbortController>(null)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const options = queryOptions({
    queryKey: ['station', stationId],
    queryFn: async ({ signal }) => {
      loadMoreDataSignal.current?.abort()
      return loadStationData(stationId, { signal })
    },

    refetchOnWindowFocus: false
  })
  const { data, isFetching, refetch } = useQuery(options)

  async function loadMoreData() {
    if (!stationId || !data) return

    try {
      setIsLoadingMore(true)

      loadMoreDataSignal.current?.abort()
      loadMoreDataSignal.current = new AbortController()

      const newData = await loadStationData(stationId, {
        oldData: data,
        signal: loadMoreDataSignal.current.signal
      })

      queryClient.setQueryData(options.queryKey, newData)
    } catch {
    } finally {
      setIsLoadingMore(false)
    }
  }

  return {
    data,
    refetch,
    loadMoreData,
    isFetching,
    isLoadingMore
  }
}
