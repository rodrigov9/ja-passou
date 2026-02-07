import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { searchStations } from '@/lib/ip/search-stations'

export function useStationSearch(name: string) {
  const firstWord = name.toUpperCase().split(' ')[0]

  return useQuery({
    queryKey: ['stations', firstWord],
    placeholderData: keepPreviousData,
    staleTime: Infinity,

    queryFn: ({ signal }) =>
      firstWord ? searchStations(firstWord, { signal }) : [],
    select: data =>
      data?.filter(station =>
        station.name.toUpperCase().includes(name.toUpperCase())
      )
  })
}
