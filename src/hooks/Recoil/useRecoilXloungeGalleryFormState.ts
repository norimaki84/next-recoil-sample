import { useRecoilState } from 'recoil'
import { xloungeGalleryFormValuesState } from '~/store/atoms/xloungeGalleryAtoms'

const useSetXloungeGalleryValues = () => {
  const initFormValues = {
    nickname: '',
    file: '',
    description: '',
  }
  const [xloungeGalleryValues, setXloungeGalleryValues] = useRecoilState(
    xloungeGalleryFormValuesState(initFormValues),
  )
  return {
    xloungeGalleryValues,
    setXloungeGalleryValues,
  }
}

export { useSetXloungeGalleryValues }
