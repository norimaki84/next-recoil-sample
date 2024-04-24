// import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { presentFormDataState, presentFormValuesState } from '~/store/atoms/presentAtoms'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSetPresentFormData = () => {
  // Atomで設定したkeyを引数に渡すことで、どのAtomから値を取得するかを特定する
  // 返り値はReact hooksのuseStateと同じ
  // const [状態変数, 状態を変更するための関数] = useRecoilState(atomのkey);
  const [presentFormData, setPresentFormData] = useRecoilState(
    presentFormDataState({ overview_text: '', form_items: [], term_text: '' }),
  )

  return {
    presentFormData,
    setPresentFormData,
  }
}

const useSetPresentFormValues = () => {
  const [presentFormValues, setPresentFormValues] = useRecoilState(presentFormValuesState([]))
  return {
    presentFormValues,
    setPresentFormValues,
  }
}

export { useSetPresentFormData, useSetPresentFormValues }
