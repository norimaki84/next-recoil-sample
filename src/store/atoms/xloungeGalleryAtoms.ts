import { atom, atomFamily } from 'recoil'
import { XloungeGalleryFormValuesType } from '~/interfaces/xloungeGalleryForm'

export const xloungeGalleryFormValuesState = atomFamily<
  XloungeGalleryFormValuesType,
  XloungeGalleryFormValuesType
>({
  key: 'Xlounge/XloungeGalleryFormValues',
  default: {
    nickname: '',
    file: '',
    description: '',
  },
})
