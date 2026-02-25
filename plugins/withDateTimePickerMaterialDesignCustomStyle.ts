import {
  AndroidConfig,
  ConfigPlugin,
  withAndroidColors,
  withAndroidColorsNight,
  withAndroidStyles
} from 'expo/config-plugins'

const THEMES = {
  light: {
    primary: '#06b6d4', // color-cyan-500

    foreground: '#0a0a0a', // color-neutral-950
    foreground_variant: '#525252', // color-neutral-600
    card: '#ffffff', // color-white
    border: '#a3a3a3' // color-neutral-400
  },

  dark: {
    foreground: '#fafafa', // color-neutral-50
    foreground_variant: '#d4d4d4', // color-neutral-300
    card: '#171717', // color-neutral-900
    border: '#404040' // color-neutral-700
  }
}

const COLORS: Record<string, keyof typeof THEMES.light> = {
  primary: 'primary',
  surfaceContainerHigh: 'card',
  onSurface: 'foreground',
  onSurfaceVariant: 'foreground_variant',
  outlineVariant: 'border'
}

const withDateTimePickerMaterialDesignCustomStyle: ConfigPlugin = config => {
  config = withAndroidStyles(config, config => {
    const appTheme = config.modResults.resources.style?.find(
      (s: any) => s.$.name === 'AppTheme'
    )

    if (appTheme) {
      appTheme.$.parent = 'Theme.Material3.DayNight.NoActionBar'
      appTheme.item.push({
        _: '@style/AppCalendar',
        $: { name: 'materialCalendarTheme' }
      })
    }

    config.modResults.resources.style?.push({
      $: {
        name: 'AppCalendar',
        parent: 'ThemeOverlay.Material3.MaterialCalendar'
      },
      item: Object.entries(COLORS).map(([name, value]) => ({
        _: `@color/${value}`,
        $: { name: `color${name.charAt(0).toUpperCase()}${name.slice(1)}` }
      }))
    })

    return config
  })

  config = withAndroidColors(config, config => {
    config.modResults = applyColors(config.modResults, 'light')
    return config
  })

  config = withAndroidColorsNight(config, config => {
    config.modResults = applyColors(config.modResults, 'dark')
    return config
  })

  return config
}

function applyColors(
  modResults: AndroidConfig.Resources.ResourceXML,
  theme: keyof typeof THEMES
) {
  Object.entries(THEMES[theme]).forEach(([name, value]) => {
    modResults = AndroidConfig.Colors.assignColorValue(modResults, {
      name,
      value
    })
  })

  return modResults
}

export default withDateTimePickerMaterialDesignCustomStyle
