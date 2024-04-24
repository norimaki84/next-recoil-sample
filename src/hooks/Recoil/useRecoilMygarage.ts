import { useRecoilState } from 'recoil'
import { alternativeCarDataState } from '~/store/atoms/mygarageAtoms'

const useMygarageValues = () => {
  const [alternativeCarData, setAlternativeCarData] = useRecoilState(
    alternativeCarDataState({
      brand: { makerId: '', name: '' },
      modelNote: '',
      registrationDate: '',
    }),
  )
  return {
    alternativeCarData,
    setAlternativeCarData,
  }
}

export { useMygarageValues }
