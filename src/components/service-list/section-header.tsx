import { SectionListData, Text } from 'react-native'
import { ServiceData } from '@/lib/ip/get-station'

type ServiceListSectionHeaderProps = {
  section: SectionListData<ServiceData>
}

export function ServiceListSectionHeader({
  section
}: ServiceListSectionHeaderProps) {
  return (
    <Text className="mx-auto mt-4 rounded-full bg-secondary px-4 py-2 text-secondary-foreground">
      {section.data[0].date.format('D [de] MMMM')}
    </Text>
  )
}
