// マイガレージトップページで代替車両のサジェスト情報保存に使用するatom定義ファイル
import { atomFamily } from 'recoil'
import { AlternativeCarDataType } from '~/interfaces/mygarage'

export const alternativeCarDataState = atomFamily<AlternativeCarDataType, AlternativeCarDataType>({
  key: 'Mygarage/AlternativeCarData',
  default: { brand: { makerId: '', name: '' }, modelNote: '', registrationDate: '' },
})
