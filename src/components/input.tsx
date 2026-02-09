import { TextInput, TextInputProps } from 'react-native'
import { useCSSVariable } from 'uniwind'
import { cn } from '@/utils/cn'

export function Input({ className, ...props }: TextInputProps) {
  const [placeholderColor, selectionColor] = useCSSVariable([
    '--color-muted-foreground',
    '--color-primary'
  ]) as string[]

  return (
    <TextInput
      className={cn(
        'w-full rounded-xl border border-border bg-transparent px-3 text-foreground dark:bg-border/30',
        className
      )}
      placeholderTextColor={placeholderColor}
      selectionColor={selectionColor}
      {...props}
    />
  )
}
