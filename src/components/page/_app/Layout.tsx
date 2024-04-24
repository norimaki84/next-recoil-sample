import { ReactNode, useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { SWRRoot } from '~/components/page/_app/SWRRoot'

import { useSetUserStatusState } from '~/hooks/Recoil/useRecoilUserStatusState'

type Props = {
  children: ReactNode
}

import {
  userDataQuery,
  UserDataQueryResType,
  userStatusQuery,
  UserStatusQueryResType,
} from '~/models/user/userDataQuery'
import { defaultGraphQLClient } from '~/lib/graphqlClient'

const Layout = ({ children }: Props): JSX.Element | null => {
  const { userStatusState, setUserStatusState } = useSetUserStatusState()
  const router = useRouter()
  const [userStatusData, setUserStatusData] = useState<UserStatusQueryResType | any>(null)
  const getUserStatusData = async () => {
    try {
      const res = await defaultGraphQLClient.request<UserStatusQueryResType>(userStatusQuery)
      // console.log('01')
      setUserStatusData(res)
      // await getUuidData()
    } catch (error: any) {
      if (error.response.errors[0].message) {
        // console.log('error.response.errors[0].message', error.response.errors[0].message)
      }
      // console.log('error', error.response.errors[0].message)
      if (error.response.errors[0]) {
        // 基本的にGraphQLログインエラー時は/login/ページへリダイレクト
        if (error.response.errors[0].message === 'ログインエラー') {
          if (
            router.pathname === '/' ||
            router.pathname === '/purpose' ||
            router.pathname === '/temporary' ||
            router.pathname === '/temporary/completion' ||
            router.pathname === '/temporary/url-expired' ||
            router.pathname === '/signup' ||
            router.pathname === '/signup/completion' ||
            router.pathname === '/login' || // TODO:要検証
            router.pathname === '/purpose' ||
            router.pathname === '/maintenance' ||
            router.pathname === '/pw-reset-input' ||
            router.pathname === '/pw-reset-input/completion' ||
            router.pathname === '/pw-reset' ||
            router.pathname === '/pw-reset/completion' ||
            router.pathname === '/error' ||
            router.pathname === '/unexpected-error' ||
            router.pathname === '/duplicate-error' ||
            router.pathname === '/unknown-error' ||
            router.pathname === '/terms' ||
            router.pathname === '/privacy-policy' ||
            router.pathname === '/law' ||
            router.pathname === '/faq'
          ) {
            // 共通ページなのでリダイレクトしない
            // console.log('共通ページなのでリダイレクトしない')
          } else {
            // console.log('遷移ログイン01')
            router.push('/login/')
          }
        }
      }
    }
  }
  useEffect(() => {
    if (userStatusData !== null) {
      // console.log('userStatusData.me.status', userStatusData.me.status)
      setUserStatusState(userStatusData.me.status)

      if (userStatusData.me.status === 'unregistered') {
        // 強制ログイン中で見せても良いページ
        if (
          router.pathname === '/' ||
          router.pathname === '/purpose' ||
          router.pathname === '/temporary' ||
          router.pathname === '/temporary/completion' ||
          router.pathname === '/temporary/url-expired' ||
          router.pathname === '/signup' ||
          router.pathname === '/signup/confirmation' ||
          router.pathname === '/signup/completion' ||
          router.pathname === '/login' ||
          router.pathname === '/pw-reset-input' ||
          router.pathname === '/pw-reset-input/completion' ||
          router.pathname === '/pw-reset' ||
          router.pathname === '/pw-reset/completion' ||
          router.pathname === '/url-expired' ||
          router.pathname === '/user-error' ||
          router.pathname === '/signup/access-error' ||
          router.pathname === '/maintenance' ||
          router.pathname === '/error' ||
          router.pathname === '/unexpected-error' ||
          router.pathname === '/duplicate-error' ||
          router.pathname === '/unknown-error' ||
          router.pathname === '/terms' ||
          router.pathname === '/privacy-policy' ||
          router.pathname === '/law' ||
          router.pathname === '/faq'
        ) {
          // 強制ログインページ中に見せて良いページはそのまま表示
          // console.log('強制ログインページ中に見せて良いページはそのまま表示')
        } else {
          // 強制ログインページ中に見せたくないページはログインページへリダイレクト
          // console.log('強制ログインページ中に見せたくないページはログインページへリダイレクト')
          router.push('/login/')
        }
      } else if (
        userStatusData.me.status === 'regular_active' ||
        userStatusData.me.status === 'active_mkid_link_unprocessed' ||
        userStatusData.me.status === 'active_mkid_link_uncompleted' ||
        userStatusData.me.status === 'active_mkid_link_lost' ||
        userStatusData.me.status === 'force_activated'
      ) {
        // 正規ルートログイン中のリダイレクト振り分け
        if (
          router.pathname === '/' ||
          router.pathname === '/temporary' ||
          router.pathname === '/temporary/completion' ||
          router.pathname === '/temporary/url-expired' ||
          router.pathname === '/signup' ||
          router.pathname === '/signup/confirmation' ||
          router.pathname === '/signup/completion' ||
          router.pathname === '/login' || // TODO:検証
          // router.pathname === '/pw-reset-input' ||
          // router.pathname === '/pw-reset-input/completion' ||
          // router.pathname === '/pw-reset' || // TODO:ログイン中にも会員情報編集ページから遷移されることもあるので除外
          // router.pathname === '/pw-reset/completion' || // TODO:ログイン中にも会員情報編集ページから遷移されることもあるので除外
          router.pathname === '/url-expired' ||
          router.pathname === '/user-error' ||
          // router.pathname === '/duplicate-error' ||
          router.pathname === '/signup/access-error'
        ) {
          // 正規ルートログイン中に見せてはいけないページにアクセスした時はログイン後トップへリダイレクト
          router.push('/top/')
          // if (router.pathname === '/login') {
          //   console.log('ログインページから', userStatus.me.status)
          // }
        }
      }
    }
  }, [userStatusData])

  // const [uuidData, setUuidData] = useState<UserDataQueryResType | any>(null)
  // const getUuidData = async () => {
  //   try {
  //     const res = await defaultGraphQLClient.request<UserDataQueryResType>(userDataQuery)
  //     await console.log('res', res)
  //
  //     // setUuidData('aaaaaaa')
  //     await setTimeout(() => {
  //       setUuidData('02')
  //     }, 500)
  //   } catch (error: any) {
  //     console.log('error', error.response.errors[0].message)
  //     // if (error.response.errors[0]) {
  //     //
  //     // }
  //   }
  // }

  useEffect(() => {
    // 強制ログイン・正規ルートログイン含めユーザーステータスを
    // meクエリより取得できている場合はStoreにステータス状態を格納
    getUserStatusData().then(() => {
      if (userStatusData !== null) {
        setUserStatusState(userStatusData.me.status)
      }
    })
  }, [router.pathname])

  return <SWRRoot>{children}</SWRRoot>
}

export { Layout }
