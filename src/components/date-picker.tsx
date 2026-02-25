import { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import { StyledIcon } from './styled-icon'
import { CalendarIcon } from 'lucide-react-native'

type DatePickerProps = {
  value: Date
  onChange: (date: Date) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false)

  function handleDateChange(date: Date) {
    setOpen(false)
    onChange(date)
  }

  return (
    <>
      <TouchableOpacity
        className="w-full flex-row items-center gap-2 rounded-xl border border-border bg-transparent px-3 py-2.5 text-foreground dark:bg-border/30"
        onPress={() => setOpen(true)}
      >
        <StyledIcon icon={CalendarIcon} className="size-4 accent-foreground" />

        <Text className="text-center text-foreground">
          {value.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={open}
        mode="date"
        date={value}
        onConfirm={handleDateChange}
        onCancel={() => setOpen(false)}
        design="material"
      />
    </>
  )
}
