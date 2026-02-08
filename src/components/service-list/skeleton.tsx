import { Skeleton } from '../skeleton'
import { ServiceCardSkeleton } from '../service-card/skeleton'

export function ServiceListSkeleton() {
  return (
    <>
      <Skeleton className="mx-auto mt-4 h-9 w-32 rounded-full" />

      {Array.from({ length: 5 }).map((_, index) => (
        <ServiceCardSkeleton key={index} />
      ))}
    </>
  )
}
