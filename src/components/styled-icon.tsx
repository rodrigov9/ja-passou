import { withUniwind } from 'uniwind'
import { LucideIcon, LucideProps } from 'lucide-react-native'

type StyledIconProps = {
  icon: LucideIcon
} & LucideProps

export function StyledIcon({ icon, ...otherProps }: StyledIconProps) {
  const Styled = withUniwind(icon, {
    color: {
      fromClassName: 'className',
      styleProperty: 'accentColor'
    },
    height: {
      fromClassName: 'className',
      styleProperty: 'height'
    },
    width: {
      fromClassName: 'className',
      styleProperty: 'width'
    }
  })

  return <Styled {...otherProps} />
}
