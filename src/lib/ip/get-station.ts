import { AxiosRequestConfig } from 'axios'
import { ipApi } from './api'
import { dayjs } from '@/lib/dayjs'

import { formatName } from '@/utils/format-name'
import {
  getServiceDelay,
  getServiceStatus,
  ServiceStatus
} from './service-status'
import { SERVICE_TYPE_MAP } from './service-type-map'

enum StationRequestType {
  Departures = 1,
  Arrivals = 2
}

type ServiceRawData = {
  ComboioPassou: boolean
  DataHoraPartidaChegada: string
  DataHoraPartidaChegada_ToOrderBy: string
  DataHoraPartidaChegada_ToOrderByi: string
  DataRealizacao: string
  EstacaoDestino: number
  EstacaoOrigem: number
  NComboio1: number
  NComboio2: number
  NomeEstacaoDestino: string
  NomeEstacaoOrigem: string
  Observacoes: string
  Operador: string
  TipoServico: string
}

type StationRawData = {
  NodeID: number
  NodesComboioTabelsPartidasChegadas: ServiceRawData[]
  NomeEstacao: string
  TipoPedido: StationRequestType
}

type GetStationResponse = {
  response: StationRawData[]
}

export type ServiceData = ReturnType<typeof parseService>

function parseService(service: ServiceRawData) {
  const id = service.NComboio1
  const date = dayjs(
    service.DataHoraPartidaChegada_ToOrderBy,
    'DD-MM-YYYY HH:mm:ss'
  )

  return {
    key: `${id}_${date.unix()}`,
    id,
    operator: formatName(service.Operador),
    type: SERVICE_TYPE_MAP[service.TipoServico] || service.TipoServico,
    date,
    origin: {
      id: service.EstacaoOrigem,
      name: formatName(service.NomeEstacaoOrigem)
    },
    destination: {
      id: service.EstacaoDestino,
      name: formatName(service.NomeEstacaoDestino)
    },
    hasPassed: service.ComboioPassou,
    status: getServiceStatus(service.Observacoes),
    delay: getServiceDelay(service.Observacoes)
  }
}

function filterService(service: ServiceData) {
  return (
    !service.hasPassed &&
    (-service.date.add(service.delay).diff() <= 1 * 60 * 1000 ||
      (service.status === ServiceStatus.CANCELLED &&
        -service.date.diff() <= 1 * 60 * 60 * 1000))
  )
}

export async function getStation(
  {
    stationId,
    start,
    hours
  }: { stationId: string; start: dayjs.Dayjs; hours: number },
  config?: AxiosRequestConfig
) {
  const dateStart = start.format('YYYY-MM-DD HH:mm')
  const dateEnd = start.add(hours, 'hours').format('YYYY-MM-DD HH:mm')
  const types = Object.keys(SERVICE_TYPE_MAP).join(', ')

  const { data } = await ipApi.get<GetStationResponse>(
    `/partidas-chegadas/${stationId}/${dateStart}/${dateEnd}/${types}`,
    config
  )

  const departures =
    data.response.find(r => r.TipoPedido === StationRequestType.Departures)
      ?.NodesComboioTabelsPartidasChegadas ?? []

  const arrivals =
    data.response.find(r => r.TipoPedido === StationRequestType.Arrivals)
      ?.NodesComboioTabelsPartidasChegadas ?? []

  const parsedDepartures = departures.map(parseService)
  const parsedArrivals = arrivals.map(parseService)

  const nextFetchStart =
    dayjs.min(
      [parsedDepartures.at(-1)?.date, parsedArrivals.at(-1)?.date].filter(
        date => !!date
      )
    ) ?? start.add(hours, 'hours')

  return {
    id: data.response[0]?.NodeID,
    name: data.response[0] && formatName(data.response[0].NomeEstacao),

    departures: parsedDepartures.filter(filterService),
    arrivals: parsedArrivals.filter(filterService),

    nextFetchStart
  }
}
