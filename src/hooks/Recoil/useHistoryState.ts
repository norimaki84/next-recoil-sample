import { useRecoilState } from 'recoil'
import { historyState } from '~/store/atoms/historyAtoms'

const useHistory = () => {
  const [history, setHistory] = useRecoilState(historyState)
  return {
    history,
    setHistory,
  }
}

export { useHistory }
