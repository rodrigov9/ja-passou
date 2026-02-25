import { Ref } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useCSSVariable } from 'uniwind'
import { cn } from '@/utils/cn'

type InputProps = TextInputProps & {
  ref?: Ref<TextInput>
}

export function Input({ className, ...props }: InputProps) {
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
