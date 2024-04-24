export type FormatDateType = {
  year: number
  month: number
  date: number
}

const getFormatISODate = (data: FormatDateType): string => {
  const dt = new Date(Date.UTC(data.year, data.month - 1, data.date))
  const jdt = new Date(dt.getTime() + 9 * 60 * 60 * 1000) // 9時間ずらす
  return jdt.toISOString().split('Z')[0] + '+09:00'
}

export { getFormatISODate }
