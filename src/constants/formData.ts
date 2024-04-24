import { OptionType } from '~/interfaces/form'

export const PlaceholderOptionData: OptionType = {
  value: '',
  label: '選択してください',
}
export const PlaceholderPrefectureOptionData: OptionType = {
  value: 0,
  label: '都道府県',
}

export const sexualityValues = ['male', 'female', 'wont_answer', 'others']
export const sexualityData = [
  {
    label: '男性',
    value: sexualityValues[0],
  },
  {
    label: '女性',
    value: sexualityValues[1],
  },
  {
    label: 'その他',
    value: sexualityValues[3],
  },
  {
    label: '回答しない',
    value: sexualityValues[2],
  },
]

// const getYearData = () => {
//   const start = 1900
//   const end = 2022
//   const data = [
//     {
//       value: '',
//       label: '年',
//     },
//   ]
//   for (let i = start; i <= start + end - start; i++) {
//     data.push({
//       value: i.toString(),
//       label: i + '年',
//     })
//   }
//   return data
// }
// export const yearData = getYearData()

// const getMonthData = () => {
//   const start = 1
//   const end = 12
//   const data = [
//     {
//       value: '',
//       label: '月',
//     },
//   ]
//   for (let i = start; i <= start + end - start; i++) {
//     data.push({
//       value: (i > 9 ? i : '0' + i).toString(),
//       label: i + '月',
//     })
//   }
//   return data
// }
// export const monthData = getMonthData()

// export const getDayData = (length: number): OptionType[] => {
//   const start = 1
//   const end = length
//   const data = [
//     {
//       value: '',
//       label: '日',
//     },
//   ]
//   for (let i = start; i <= start + end - start; i++) {
//     data.push({
//       value: (i > 9 ? i : '0' + i).toString(),
//       label: i + '日',
//     })
//   }
//   return data
// }

const commonPrefecturesData = [
  {
    value: 1,
    label: '北海道',
  },
  {
    value: 2,
    label: '青森県',
  },
  {
    value: 3,
    label: '岩手県',
  },
  {
    value: 4,
    label: '宮城県',
  },
  {
    value: 5,
    label: '秋田県',
  },
  {
    value: 6,
    label: '山形県',
  },
  {
    value: 7,
    label: '福島県',
  },
  {
    value: 8,
    label: '茨城県',
  },
  {
    value: 9,
    label: '栃木県',
  },
  {
    value: 10,
    label: '群馬県',
  },
  {
    value: 11,
    label: '埼玉県',
  },
  {
    value: 12,
    label: '千葉県',
  },
  {
    value: 13,
    label: '東京都',
  },
  {
    value: 14,
    label: '神奈川県',
  },
  {
    value: 15,
    label: '新潟県',
  },
  {
    value: 16,
    label: '富山県',
  },
  {
    value: 17,
    label: '石川県',
  },
  {
    value: 18,
    label: '福井県',
  },
  {
    value: 19,
    label: '山梨県',
  },
  {
    value: 20,
    label: '長野県',
  },
  {
    value: 21,
    label: '岐阜県',
  },
  {
    value: 22,
    label: '静岡県',
  },
  {
    value: 23,
    label: '愛知県',
  },
  {
    value: 24,
    label: '三重県',
  },
  {
    value: 25,
    label: '滋賀県',
  },
  {
    value: 26,
    label: '京都府',
  },
  {
    value: 27,
    label: '大阪府',
  },
  {
    value: 28,
    label: '兵庫県',
  },
  {
    value: 29,
    label: '奈良県',
  },
  {
    value: 30,
    label: '和歌山県',
  },
  {
    value: 31,
    label: '鳥取県',
  },
  {
    value: 32,
    label: '島根県',
  },
  {
    value: 33,
    label: '岡山県',
  },
  {
    value: 34,
    label: '広島県',
  },
  {
    value: 35,
    label: '山口県',
  },
  {
    value: 36,
    label: '徳島県',
  },
  {
    value: 37,
    label: '香川県',
  },
  {
    value: 38,
    label: '愛媛県',
  },
  {
    value: 39,
    label: '高知県',
  },
  {
    value: 40,
    label: '福岡県',
  },
  {
    value: 41,
    label: '佐賀県',
  },
  {
    value: 42,
    label: '長崎県',
  },
  {
    value: 43,
    label: '熊本県',
  },
  {
    value: 44,
    label: '大分県',
  },
  {
    value: 45,
    label: '宮崎県',
  },
  {
    value: 46,
    label: '鹿児島県',
  },
  {
    value: 47,
    label: '沖縄県',
  },
]

export const selectPrefecturesData = [
  {
    value: 0,
    label: '選択してください',
  },
].concat(commonPrefecturesData)

export const handlePrefecturesData = [
  {
    value: 0,
    label: '都道府県',
  },
].concat(commonPrefecturesData)

// export const brandData = [
//   {
//     value: '',
//     label: '選択してください',
//   },
//   {
//     value: 'brandA',
//     label: 'ブランドA',
//   },
//   {
//     value: 'brandB',
//     label: 'ブランドB',
//   },
//   {
//     value: 'text',
//     label: '車種をテキスト入力に変更',
//   },
// ]

export const handleBrandData = [
  {
    value: '',
    label: 'ブランド',
  },
  {
    value: 'brandA',
    label: 'ブランドA',
  },
  {
    value: 'brandB',
    label: 'ブランドB',
  },
]

export const storeData = [
  {
    value: '',
    label: '店舗名',
  },
  {
    value: 'storeA',
    label: '店舗A',
  },
  {
    value: 'storeB',
    label: '店舗B',
  },
]
