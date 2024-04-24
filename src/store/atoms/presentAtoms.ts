// Owner´s Present系で使用するatom定義ファイル
import { atom, atomFamily } from 'recoil'
import { PresentFormDataType, PresentFormValuesType } from '~/interfaces/presentForm'

// export const presentFormState = atom<string>({
//   key: 'Present/PresentFormVal', // 他のatomやselectorに対して一意のID
//   default: '', // デフォルト値(初期値)
// })

export const presentFormDataState = atomFamily<PresentFormDataType, PresentFormDataType>({
  key: 'Present/PresentFormData',
  default: { overview_text: '', form_items: [], term_text: '' },
})

export const presentFormValuesState = atomFamily<PresentFormValuesType, PresentFormValuesType>({
  key: 'Present/PresentFormValues',
  default: [],
})
