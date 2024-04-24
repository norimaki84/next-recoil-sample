/**
 * MY CAR HISTORYページのMutationを設定
 */

import { gql } from 'graphql-request'

/**
 * ヒストリー登録車の更新を送信するMutationへ渡すパラメータの型
 */
export type updateMyCarHistoryMutationRequestType = {
  input: {
    args: {
      uuid?: string | undefined
      note?: string | undefined
      carModelText?: string | undefined
      base64Image?: string | undefined
      // ownershipStartedDate?: string | undefined
      ownershipStartedYear?: number | null | undefined
      ownershipStartedMonth?: number | null | undefined
      ownershipStartedDay?: number | null | undefined
    }
  }
}

/**
 * ヒストリー登録車の更新（note）
 */
export const updateNoteMyCarHistoryMutation = gql`
  mutation ($input: UpdateMyCarHistoryMutationInput!) {
    updateMyCarHistoryMutation(input: $input) {
      car {
        note
      }
    }
  }
`

/**
 * ヒストリー登録車の更新
 */
export const updateMyCarHistoryMutation = gql`
  mutation ($input: UpdateMyCarHistoryMutationInput!) {
    updateMyCarHistoryMutation(input: $input) {
      car {
        carModelText
        imageUrl
        ownershipStartedYear
        ownershipStartedMonth
        ownershipStartedDay
      }
    }
  }
`

/**
 * ヒストリー登録車の更新した返値の型
 */
export type updateMyCarHistoryMutationResponseType = {
  updateMyCarHistoryMutation: {
    car: {
      uuid?: string | undefined
      note?: string | undefined
      carModelText?: string | undefined
      base64Image?: string | undefined
      // ownershipStartedDate?: string | undefined
      ownershipStartedYear?: number | null | undefined
      ownershipStartedMonth?: number | null | undefined
      ownershipStartedDay?: number | null | undefined
    }
  }
}

/**
 * マイカーの更新を送信するMutationへ渡すパラメータの型
 */
export type upsertManagedCarMutationRequestType = {
  input: {
    args: {
      garageNo: number | undefined
      note: string | undefined
    }
  }
}

/**
 * マイカーの更新
 */
export const upsertManagedCarMutation = gql`
  mutation ($input: UpsertManagedCarsMutationInput!) {
    upsertManagedCarsMutation(input: $input) {
      cars {
        note
      }
    }
  }
`

/*
mutation ($input: UpsertManagedCarMutationInput!) {
  upsertManagedCarMutation(input: $input) {
    car {
      note
    }
  }
}
{
  "input": {
    "args": {
      "garageNo": 5,
      "note": "super car"
    }
  }
}
*/

/**
 * ヒストリー登録車の更新した返値の型
 */
export type upsertManagedCarMutationResponseType = {
  upsertManagedCarsMutation: {
    cars: {
      note: string | undefined
    }
  }
}

/**
 * ヒストリー登録車の削除を送信するMutationへ渡すパラメータの型
 */
export type destroyHistoryCarMutationRequestType = {
  input: {
    args: {
      uuid: string | undefined
    }
  }
}

/**
 * ヒストリー登録車の削除
 */
export const destroyHistoryCarMutation = gql`
  mutation destroyHistoryCar($input: DestroyHistoryCarMutationInput!) {
    destroyHistoryCarMutation(input: $input) {
      result
    }
  }
`

/**
 * ヒストリー登録車を削除した返値の型
 */
export type destroyHistoryCarMutationResponseType = {
  destroyHistoryCarMutation: {
    result: boolean
  }
}

/**
 * マイカーの削除を送信するMutationへ渡すパラメータの型
 */
export type destroyManagedCarMutationRequestType = {
  input: {
    args: {
      garageNo: number | undefined
    }
  }
}

/**
 * マイカーの削除
 */
export const destroyManagedCarMutation = gql`
  mutation destroyManagedCar($input: DestroyManagedCarMutationInput!) {
    destroyManagedCarMutation(input: $input) {
      result
    }
  }
`

/**
 * マイカーを削除した返値の型
 */
export type destroyManagedCarMutationResponseType = {
  destroyManagedCarMutation: {
    result: boolean
  }
}

/**
 * ヒストリー登録車の生成を送信するMutationへ渡すパラメータの型
 */
export type createHistoryCarMutationRequestType = {
  input: {
    args: {
      carModelText: string | undefined
      base64Image: string | undefined
      // ownershipStartedDate: string | undefined
      ownershipStartedYear?: number | null | undefined
      ownershipStartedMonth?: number | null | undefined
      ownershipStartedDay?: number | null | undefined
    }
  }
}

/**
 * ヒストリー登録車の生成
 */
export const createHistoryCarMutation = gql`
  mutation createHistoryCar($input: CreateHistoryCarMutationInput!) {
    createHistoryCarMutation(input: $input) {
      car {
        ownershipStartedYear
        ownershipStartedMonth
        ownershipStartedDay
        carModelText
        imageUrl
      }
    }
  }
`

/**
 * ヒストリー登録車の生成した返値の型
 */
export type createHistoryCarMutationResponseType = {
  createHistoryCarMutation: {
    car: {
      // ownershipStartedDate: string
      ownershipStartedYear?: number | null | undefined
      ownershipStartedMonth?: number | null | undefined
      ownershipStartedDay?: number | null | undefined
      carModelText: string
      imageUrl: string
    }
  }
}

// Query
// ```
// mutation ($input: UpdateHistoryCarMutationInput!) {
//   updateHistoryCarMutation(input: $input) {
//         car {
//       carModelText
//       imageUrl
//       ownershipStartedDate
//     }
//   }
// }
// ```

// Query Variables

// ```
// {
//   "input": {
//     "args": {
//       "uuid": "9a768d67-d949-446c-96f1-6ecd3f8d466e",
//       "carModelText": "my super car",
//       "base64Image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
//       "ownershipStartedDate": "1990-04-23"
//     }
//   }
// }
// ```
