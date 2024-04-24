/**
 * 担当店舗のQueryを設定
 */

import { gql } from 'graphql-request'

/**
 * 担当店舗情報を取得するQuery
 */
export const prefecturesQuery = gql`
  query getPrefectures {
    prefectures {
      nodes {
        name
        storeBrands {
          makerId
          name
          stores {
            id
            name
          }
        }
      }
    }
  }
`

/**
 * StoreTypeの型
 */
export type StoreType = {
  id: string
  name: string
}

/**
 * StoreBrandTypeの型
 */
export type StoreBrandType = {
  makerId: string
  name: string
  stores: StoreType[]
}

/**
 * 県（道・府）の型
 */
export type PrefectureType = {
  name: string
  storeBrands: StoreBrandType[]
}

/**
 * 担当店舗情報を取得した返値の型
 */
export type prefecturesQueryResType = {
  prefectures: {
    nodes: PrefectureType[]
  }
}
