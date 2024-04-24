/******************************
 SWR基本設定
 SWRConfigを使ってdefaultのfetcherを定義している
 →fetcherを省略できる

 ※SWR基本
 ※queryにGraphQL query文字列を渡して返り値を得る
 useSWR フックは key 文字列と fetcher 関数を受け取ります。 key はデータの一意な識別子（通常は API の URL）で、fetcher に渡されます。 fetcher はデータを返す任意の非同期関数で、ネイティブの fetch や Axios のようなツールを使うことができます。
 このフックは、リクエストの状態にもとづいて data と error の二つの値を返します。
 ******************************/
import { defaultGraphQLClient } from '~/lib/graphqlClient'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import useSWR, { SWRConfig } from 'swr'
// import { userStatusQuery, UserStatusQueryResType } from '~/models/user/userDataQuery'

type Props = {
  children: ReactNode
}

const SWRRoot = ({ children }: Props): JSX.Element | null => {
  return (
    <SWRConfig
      value={{
        // provider: () => new Map(),
        fetcher: (query) => defaultGraphQLClient.request(query),
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          // if (error.status === undefined) return
          // console.log('error.status', error.status)
          // 404では再試行しない。
          // if (error.status === 404) return
          // 特定のキーでは再試行しない。
          // if (key === '/api/user') return
          // 再試行は10回までしかできません。
          // if (retryCount >= 10) return
          // 5秒後に再試行します。
          // setTimeout(() => revalidate({ retryCount }), 5000)
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}

export { SWRRoot }
