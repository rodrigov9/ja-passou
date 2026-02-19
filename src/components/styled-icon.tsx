import { withUniwind } from 'uniwind'
import { LucideIcon, LucideProps } from 'lucide-react-native'

type StyledIconProps = {
  icon: LucideIcon
  fillClassName?: string
} & LucideProps

export function StyledIcon({ icon: Icon, ...otherProps }: StyledIconProps) {
  const Styled = withUniwind(
    ({ fill, ...props }) => {
      if (fill) props.fill = fill
      return <Icon {...props} />
    },
    {
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
      },
      fill: {
        fromClassName: 'className',
        styleProperty: 'fill'
      }
    }
  )

  return <Styled {...otherProps} />
}
