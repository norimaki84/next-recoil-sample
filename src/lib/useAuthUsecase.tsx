import { useRouter } from 'next/router'
import { useAuthRepository } from '~/repositories/auth/repository'
import { useSetUserStatusState } from '~/hooks/Recoil/useRecoilUserStatusState'

const useAuthUsecase = (): any => {
  const { userStatusState, setUserStatusState } = useSetUserStatusState()
  const { logout } = useAuthRepository()

  const router = useRouter()

  const handleLogout = async () => {
    try {
      // ログアウトAPI実行
      await logout()

      // ログイン状態を格納しているStoreのStateを更新
      // location.hrefで遷移されてStoreがリセットされるので不要かも
      // await setUserStatusState('')

      // ログイン画面へリダイレクト
      window.location.href = '/login/'
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      }
    }
  }

  return { handleLogout }
}

export { useAuthUsecase }
