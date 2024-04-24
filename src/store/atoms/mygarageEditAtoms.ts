import { atom, atomFamily } from 'recoil'
import { MygarageEditValuesType } from '~/interfaces/mygarageEdit'

export const initMygarageEditValues = {
  isUpdated: false,
}

export const mygarageEditValuesState = atomFamily<MygarageEditValuesType, MygarageEditValuesType>({
  key: 'MygarageEdit/MygarageEditValues',
  default: initMygarageEditValues,
})
