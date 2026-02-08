import { TextInput, TextInputProps } from 'react-native'
import { useResolveClassNames } from 'uniwind'
import { cn } from '@/utils/cn'

export function Input({ className, ...props }: TextInputProps) {
  const placeholderStyle = useResolveClassNames('text-muted-foreground')

  return (
    <TextInput
      className={cn(
        'w-full rounded-xl border border-border bg-transparent px-3 text-foreground dark:bg-border/30',
        className
      )}
      placeholderTextColor={placeholderStyle.color}
      {...props}
    />
  )
}
