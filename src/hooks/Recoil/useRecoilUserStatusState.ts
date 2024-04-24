import { useRecoilState } from 'recoil'
import { userStatusValueState } from '~/store/atoms/userAtoms'

const useSetUserStatusState = () => {
  const [userStatusState, setUserStatusState] = useRecoilState(userStatusValueState)

  return {
    userStatusState,
    setUserStatusState,
  }
}

export { useSetUserStatusState }
