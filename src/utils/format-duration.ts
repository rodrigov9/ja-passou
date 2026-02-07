import { Duration } from 'dayjs/plugin/duration'

export function formatDuration(duration: Duration) {
  const parts: string[] = []

  const hours = duration.hours()
  const minutes = duration.minutes()

  if (hours) {
    parts.push(`${hours} h`)
  }

  if (minutes) {
    parts.push(`${minutes} min`)
  }

  return parts.join(' ')
}
