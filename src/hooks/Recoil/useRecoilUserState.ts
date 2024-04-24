import { useRecoilState } from 'recoil'
import { userValueState } from '~/store/atoms/userAtoms'

const useSetUserState = () => {
  // const initUserValue = {
  //   userId: '',
  //   loginStatus: false,
  // }
  const [userState, setUserState] = useRecoilState(userValueState)

  return {
    userState,
    setUserState,
  }
}

export { useSetUserState }
