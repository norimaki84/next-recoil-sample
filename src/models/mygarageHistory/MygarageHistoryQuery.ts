import { carType } from '~/models/common/carType'

/**
 * 会員情報編集ページ関係のQueryを設定
 */

import { gql } from 'graphql-request'

/**
 * mygarageHistoryで必要な情報を取得するQuery
 */
export const mygarageHistoryQuery = gql`
  query {
    me {
      cars(
        q: {
          s: [
            "ownership_started_year asc"
            "ownership_started_month asc"
            "ownership_started_day asc"
          ]
        }
      ) {
        isManagedCar
        carModelText
        note
        imageUrl
        ownershipStartedYear
        ownershipStartedMonth
        ownershipStartedDay
        managedCarAttribute {
          linkStatus
          garageNo
          brand
          carModel {
            name
          }
          carModelNote
        }
        uuid
      }
    }
  }
`

/**
 * mygarageQueryで取得した返値の型
 */
export type mygarageHistoryQueryResType = {
  me: {
    cars: carType[]
  }
}
