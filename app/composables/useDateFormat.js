import { format } from 'date-fns'
import { enGB, uk  } from 'date-fns/locale'


const LOCALE_MAP = { uk, en: enGB }

export function useDateFormat() {
  const { locale } = useI18n()

  const formatDate = (iso) => {
    if (!iso) return ''
    const date = new Date(iso)

    const lang = LOCALE_MAP[locale.value] ? locale.value : 'uk'
    const formatted = format(date, 'd MMMM yyyy', { locale: LOCALE_MAP[lang] })

    return formatted.toLowerCase()
  }

  return { formatDate }
}
