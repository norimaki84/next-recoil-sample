/**
 * ブランド情報のQueryを設定
 */

import { gql } from 'graphql-request'

/**
 * ブランド情報を取得するQuery
 */
export const brandsQuery = gql`
  query getBrands {
    brands {
      nodes {
        makerId
        name
        carModels {
          name
          uuid
        }
      }
    }
  }
`

/**
 * carModelの型
 */
export type CarModelType = {
  name: string
  uuid: string
}

/**
 * ブランドの型
 */
export type BrandType = {
  makerId?: string
  name?: string | undefined
  carModels?: CarModelType[]
}

/**
 * ブランド情報を取得した返値の型
 */
export type brandsQueryResType = {
  brands: {
    nodes: BrandType[]
  }
}
