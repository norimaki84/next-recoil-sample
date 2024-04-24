import { getZeroPadding } from '~/lib/getZeroPadding'

export type FormatDateType = {
  year: number
  month: number | string | any
  date: number | string | any
}

const getFormatDate = (data: string): FormatDateType => {
  const dtVal = new Date(data)
  const yearVal = dtVal.getFullYear()
  // const month = dtVal.getMonth()
  // const monthVal = getZeroPadding(month + 1, 2)
  // const date = dtVal.getDate()
  // const dateVal = getZeroPadding(date, 2)

  const month = dtVal.getMonth()

  // const monthVal = month ? getZeroPadding(month + 1, 2) : month
  let monthVal = null
  if (month === 0) {
    monthVal = getZeroPadding(month + 1, 2)
  } else if (month !== 0) {
    monthVal = month ? getZeroPadding(month + 1, 2) : month
  }

  const date = dtVal.getDate()
  const dateVal = date ? getZeroPadding(date, 2) : date

  // console.log('month', month)
  // console.log('monthVal', getZeroPadding(month + 1, 2))

  const formatDateData = {
    year: yearVal,
    month: monthVal,
    date: dateVal,
  }

  return formatDateData
}

export { getFormatDate }
