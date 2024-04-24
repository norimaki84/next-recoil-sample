import { useState, useEffect } from 'react'
import { OptionType } from '~/interfaces/form'

export type DateSelects = {
  year: number | null | undefined
  month: number | null | undefined
  day: number | null | undefined
  dayLen: number | null
  yearData: OptionType[]
  monthData: OptionType[]
  dayData: OptionType[]
  setYear: (value: number | null | undefined) => void
  setMonth: (value: number | null | undefined) => void
  setDay: (value: number | null | undefined) => void
  changeDayLen: (year: number, month: number) => void
  getLastDay: (year: number, month: number) => number
}
const useDateSelects = (): DateSelects => {
  const [yearData, setYearData] = useState<OptionType[]>([])
  const [monthData, setMonthData] = useState<OptionType[]>([])
  const [dayData, setDayData] = useState<OptionType[]>([])
  const [day, setDay] = useState<number | null | undefined>(null)
  const [dayLen, setDayLen] = useState<number | null>(null)
  const [year, setYear] = useState<number | null | undefined>(null)
  const [month, setMonth] = useState<number | null | undefined>(null)
  // const [month, setMonth] = useState<any>('')

  useEffect(() => {
    setYearData(getYearData())
    setMonthData(getMonthData())
  }, [])

  // 年（select）のoption生成
  // TODO：マイカーヒストリーの保有開始年のセレクトの範囲を設定
  const getYearData = () => {
    const start = 1900
    const end = 2024
    const data = [
      {
        value: '',
        label: '年',
      },
    ]
    for (let i = start; i <= start + end - start; i++) {
      data.push({
        value: i.toString(),
        label: i + '年',
      })
    }
    return data
  }

  // 月（select）のoption生成
  const getMonthData = () => {
    const start = 1
    const end = 12
    const data = [
      {
        value: '',
        label: '月',
      },
    ]
    for (let i = start; i <= start + end - start; i++) {
      data.push({
        value: (i > 9 ? i : '0' + i).toString(),
        label: i + '月',
      })
    }
    return data
  }

  // 日（select）のoption生成
  const getDayData = (length: number): OptionType[] => {
    const start = 1
    const end = length
    const data = [
      {
        value: '',
        label: '日',
      },
    ]
    for (let i = start; i <= start + end - start; i++) {
      data.push({
        value: (i > 9 ? i : '0' + i).toString(),
        label: i + '日',
      })
    }
    return data
  }

  // 日数の設定
  const changeDayLen = (year: number, month: number) => {
    const len = getLastDay(Number(year), Number(month))
    setDayData(getDayData(len !== 0 ? len : 31))
  }

  // ラスト日を取得
  const getLastDay = (year: number | null, month: number | null): number => {
    if (!year || !month) return 0
    return new Date(year, month, 0).getDate()
  }

  return {
    year,
    month,
    day,
    dayLen,
    yearData,
    monthData,
    dayData,
    setYear,
    setMonth,
    setDay,
    changeDayLen,
    getLastDay,
  }
}

export { useDateSelects }
