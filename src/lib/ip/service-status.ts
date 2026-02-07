import { dayjs } from '@/lib/dayjs'

export enum ServiceStatus {
  ON_GOING = 'On going',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed',
  SCHEDULED = 'Scheduled'
}

const SERVICE_STATUS_MAP: Record<string, ServiceStatus> = {
  SUPRIMIDO: ServiceStatus.CANCELLED,
  Realizado: ServiceStatus.COMPLETED,
  Programado: ServiceStatus.SCHEDULED
}

export function getServiceStatus(notes: string) {
  return SERVICE_STATUS_MAP[notes] || ServiceStatus.ON_GOING
}

export function getServiceDelay(notes: string) {
  const delay = notes.match(/Circula com atraso de (\d+) min\./)?.[1] ?? '0'
  return dayjs.duration(parseInt(delay), 'minutes')
}
