import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import minMax from 'dayjs/plugin/minMax'
import 'dayjs/locale/pt'

dayjs.extend(customParseFormat)
dayjs.extend(duration)
dayjs.extend(minMax)
dayjs.locale('pt')

export { dayjs }
