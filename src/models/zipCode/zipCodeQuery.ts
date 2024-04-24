/**
 * 郵便番号で住所検索のQueryを設定
 */

import { gql } from 'graphql-request'

/**
 * 郵便番号を指定して住所情報を取得するQuery
 * prefectureCode: 都道府県コード
 * city: 市区町村 番地
 * town: 町域番地 ※画面上では建物名・号室
 */
export const zipCodeQuery = gql`
  query getZipCode($zipcode: String!) {
    zipCode(zipcode: $zipcode) {
      prefectureCode
      city
      town
    }
  }
`

/**
 * 郵便番号を指定して住所情報を取得した返値の型
 */
export type zipCodeQueryResType = {
  zipCode: {
    prefectureCode: number
    city: string
    town: string
  }
}
