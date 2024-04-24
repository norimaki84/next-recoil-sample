import { PlaceholderOptionData, PlaceholderPrefectureOptionData } from '~/constants/formData'
import { OptionType } from '~/interfaces/form'
import { BrandType, CarModelType } from '~/models/brands/brandsQuery'
import { PrefectureType, StoreBrandType, StoreType } from '~/models/prefectures/prefecturesQuery'

// ブランド情報をselect用にフォーマット変更
const changeFormatBrandSelectData = (dataList: BrandType[]): OptionType[] => {
  const result: OptionType[] = dataList.map((data: BrandType) => {
    return {
      value: data.makerId ? data.makerId : '',
      label: data.name ? data.name : '',
    }
  })
  result.unshift(PlaceholderOptionData)
  return result
}

// carModels情報をselect用にフォーマット変更
const changeFormatCarModelsSelectData = (dataList: CarModelType[]): OptionType[] => {
  const result: OptionType[] = dataList.map((data: CarModelType) => {
    return {
      value: data.name,
      label: data.name,
    }
  })
  result.unshift(PlaceholderOptionData)
  return result
}

// 担当店舗 都道府県select用にフォーマット変更
const changeFormatPrefecturesSelectData = (dataList: PrefectureType[]): OptionType[] => {
  const result: OptionType[] = []
  dataList.forEach((data: PrefectureType, index: number) => {
    if (data.storeBrands.length > 0) {
      // ブランドデータがない都道府県は除外する
      result.push({
        value: Number(index + 1),
        label: data.name,
      })
    }
  })
  result.unshift(PlaceholderPrefectureOptionData)
  return result
}

// 担当店舗 ブランドselect用にフォーマット変更
const changeFormatStoreBrandSelectData = (data: PrefectureType): OptionType[] => {
  const result: OptionType[] = data.storeBrands.map((storeBrand: StoreBrandType) => {
    return {
      value: storeBrand.makerId ? storeBrand.makerId : '',
      label: storeBrand.name ? storeBrand.name : '',
    }
  })
  result.unshift(PlaceholderOptionData)
  return result
}

// 担当店舗 店舗名select用にフォーマット変更
const changeFormatStoreNameSelectData = (dataList: StoreType[]): OptionType[] => {
  const result: OptionType[] = dataList.map((storeBrand: StoreType) => {
    return {
      value: storeBrand.id ? storeBrand.id : '',
      label: storeBrand.name ? storeBrand.name : '',
    }
  })
  result.unshift(PlaceholderOptionData)
  return result
}

export {
  changeFormatBrandSelectData,
  changeFormatCarModelsSelectData,
  changeFormatPrefecturesSelectData,
  changeFormatStoreBrandSelectData,
  changeFormatStoreNameSelectData,
}
