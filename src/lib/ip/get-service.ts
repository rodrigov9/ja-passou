import { AxiosRequestConfig } from 'axios'
import { ipApi } from './api'
import { dayjs } from '@/lib/dayjs'

import { formatName } from '@/utils/format-name'
import { SERVICE_TYPE_MAP } from './service-type-map'
import { getServiceDelay, getServiceStatus } from './service-status'

type ServiceRawData = {
  DataHoraDestino: string
  DataHoraOrigem: string
  Destino: string
  DuracaoViagem: string
  Operador: string
  Origem: string
  SituacaoComboio: string
  TipoServico: string
  NodesPassagemComboio: {
    ComboioPassou: boolean
    HoraProgramada: string
    NodeID: number
    NomeEstacao: string
    Observacoes: string
  }[]
}

type GetServiceResponse = {
  response: ServiceRawData
}

export async function getService(
  { id, date }: { id: string; date: string },
  config?: AxiosRequestConfig
) {
  const { data } = await ipApi.get<GetServiceResponse>(
    `/horarios-ncombio/${id}/${date}`,
    config
  )

  const delay = getServiceDelay(data.response.SituacaoComboio)

  return {
    id: parseInt(id),
    operator: formatName(data.response.Operador),
    type:
      SERVICE_TYPE_MAP[data.response.TipoServico] || data.response.TipoServico,
    origin: formatName(data.response.Origem),
    destination: formatName(data.response.Destino),
    departureTime: dayjs(data.response.DataHoraOrigem, 'DD/MM/YYYY HH:mm:ss'),
    arrivalTime: dayjs(data.response.DataHoraDestino, 'DD/MM/YYYY HH:mm:ss'),
    duration: dayjs.duration({
      hours: parseInt(data.response.DuracaoViagem.split(':')[0]),
      minutes: parseInt(data.response.DuracaoViagem.split(':')[1])
    }),
    status: getServiceStatus(data.response.SituacaoComboio),
    delay,

    stops: data.response.NodesPassagemComboio.map(stop => {
      let timeString = `${date} ${stop.HoraProgramada}`
      let format = 'YYYY-MM-DD HH:mm'

      if (stop.NomeEstacao === data.response.Origem) {
        timeString = data.response.DataHoraOrigem
        format = 'DD/MM/YYYY HH:mm:ss'
      } else if (stop.NomeEstacao === data.response.Destino) {
        timeString = data.response.DataHoraDestino
        format = 'DD/MM/YYYY HH:mm:ss'
      }

      const scheduledTime = dayjs(timeString, format)

      return {
        station: {
          id: stop.NodeID,
          name: formatName(stop.NomeEstacao)
        },
        scheduledTime,
        hasPassed: stop.ComboioPassou,
        ETA: stop.Observacoes
          ? dayjs(
              `${date} ${stop.Observacoes}`,
              'YYYY-MM-DD [Hora Prevista:]HH:mm'
            )
          : delay && !stop.ComboioPassou
            ? scheduledTime.add(delay)
            : null
      }
    })
  }
}
