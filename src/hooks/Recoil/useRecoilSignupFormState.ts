import { useRecoilState } from 'recoil'
import { signupFormValuesState, initSignupFormValues } from '~/store/atoms/signupAtoms'

const useSetSignupFormValues = () => {
  const [signupFormValues, setSignupFormValues] = useRecoilState(
    signupFormValuesState(initSignupFormValues),
  )
  return {
    signupFormValues,
    setSignupFormValues,
  }
}

export { useSetSignupFormValues }
