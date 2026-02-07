import { useMemo, useRef, useState } from 'react'
import { SectionList, SectionListData, ActivityIndicator } from 'react-native'
import { useScrollToTop } from '@react-navigation/native'

import { ServiceListSectionHeader } from './section-header'
import { ServiceListSkeleton } from './skeleton'
import { ServiceListEmpty } from './empty'
import { ServiceCard } from '../service-card'

import { useStation } from '@/hooks/useStation'
import { ServiceData } from '@/lib/ip/get-station'

type ServiceListProps = {
  type: 'departures' | 'arrivals'
}

type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends readonly (infer U)[] ? U[] : T[P]
}

function groupServicesByDate(services: ServiceData[]) {
  const sections = services.reduce(
    (acc, item) => {
      const dateKey = item.date.format('YYYY-MM-DD')

      if (!acc[dateKey]) {
        acc[dateKey] = {
          data: []
        }
      }

      acc[dateKey].data.push(item)

      return acc
    },
    {} as Record<string, Mutable<SectionListData<ServiceData>>>
  )

  return Object.values(sections)
}

export function ServiceList({ type }: ServiceListProps) {
  const listHeight = useRef(0)
  const ref = useRef<SectionList>(null)
  useScrollToTop(ref)

  const [isRefreshing, setIsRefreshing] = useState(false)
  const { data, refetch, loadMoreData, isFetching, isLoadingMore } =
    useStation()

  function onEndReached() {
    if (!isFetching && !isLoadingMore) loadMoreData()
  }

  async function refresh() {
    setIsRefreshing(true)
    await refetch()
    setIsRefreshing(false)
  }

  const sections = useMemo(
    () => (data ? groupServicesByDate(data[type]) : []),
    [data, type]
  )

  return (
    <SectionList
      ref={ref}
      // Content
      sections={sections}
      contentContainerClassName="gap-4 p-6 pt-0"
      renderItem={({ item }) => (
        <ServiceCard service={item} showOrigin={type === 'arrivals'} />
      )}
      extraData={type}
      // Refresh indicator
      onRefresh={refresh}
      refreshing={!!data && (isRefreshing || isFetching)}
      // Empty
      ListEmptyComponent={
        isFetching && !isRefreshing ? ServiceListSkeleton : ServiceListEmpty
      }
      scrollEnabled={!!data}
      // Section headers
      renderSectionHeader={ServiceListSectionHeader}
      stickySectionHeadersEnabled
      // Footer Spinner
      ListFooterComponent={
        sections.length && !isFetching ? ActivityIndicator : null
      }
      // Infinite scroll
      onLayout={e => {
        listHeight.current = e.nativeEvent.layout.height
      }}
      onContentSizeChange={(_contentWidth, contentHeight) => {
        if (contentHeight < listHeight.current) onEndReached()
      }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  )
}
