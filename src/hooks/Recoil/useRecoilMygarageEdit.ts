import { useRecoilState } from 'recoil'
import { mygarageEditValuesState, initMygarageEditValues } from '~/store/atoms/mygarageEditAtoms'

const useMygarageEditValues = () => {
  const [mygarageEditValues, setMygarageEditValues] = useRecoilState(
    mygarageEditValuesState(initMygarageEditValues),
  )
  return {
    mygarageEditValues,
    setMygarageEditValues,
  }
}

export { useMygarageEditValues }
