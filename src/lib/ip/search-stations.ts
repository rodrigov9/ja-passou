import { AxiosRequestConfig } from 'axios'
import { ipApi } from './api'
import { formatName } from '@/utils/format-name'

type SearchStationsRawData = {
  Distancia: number
  NodeID: number
  Nome: string
}[]

type SearchStationsResponse = {
  response: SearchStationsRawData | null
}

export async function searchStations(
  name: string,
  config?: AxiosRequestConfig
) {
  const { data } = await ipApi.get<SearchStationsResponse>(
    `/estacao-nome/${name}`,
    config
  )

  return (
    data.response &&
    data.response.map(station => ({
      id: station.NodeID,
      name: formatName(station.Nome)
    }))
  )
}
