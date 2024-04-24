import { NumberPlatesType } from '~/interfaces/car'

/**
 * 会員情報編集ページのMutationを設定
 */

import { gql } from 'graphql-request'

export type managedCarType = {
  carModelInputed?: string | any //車種名 (自由入力) carModelSelected と同時に入力することはできない。 車種を持たないブランドのみで有効。
  carModelSelected?: string | any //車種名 (CarModelのname) carModelInputed と同時に入力することはできない。 ブランドに属する車種とする。
  carModelNote: string | null | undefined // 車種（自由入力）
  chassisNumber: string | undefined //車台番号
  garageNo: number //車庫番号(No.1 ~ No.5まで)
  base64Image: string | undefined //車両の画像(base64)
  isStoreUnknown: boolean | undefined //担当店舗が不明か否か
  makerId: string | undefined //ブランドのメーカーID
  //- note: string //ユーザ自由入力欄
  numberPlates?: NumberPlatesType | undefined | null //ナンバープレートに関する引数
  staffName: string | undefined //担当者名
  storeId?: number | null | undefined //販売店のID
}

export type userType = {
  givenName: string // 名
  givenNameRuby: string // 名ルビ
  familyName: string // 姓
  familyNameRuby: string // 姓ルビ
  prefectureCode: number // 都道府県コード
  phoneNumber: string // 電話番号
  //- birthday: ISO8601Date // 誕生日
  birthday: string // 誕生日
  zipCode: number // 郵便番号
  address1: string // 市区町村・番地
  address2: string | undefined // 建物名および部屋番
  sexuality: string // 性別。
  rejectEmail: boolean // お知らせ系のメールを拒否するか
  email: string // Eメール
  // password: String // パスワード
  // passwordConfirmation: String // パスワード(確認用)
}

/**
 * ユーザー情報を送信するMutationへ渡すパラメータの型
 */
export type updateUserAndManagedCarsMutationRequestType = {
  updateUserMutationInput: {
    args: userType
  }
  upsertManagedCarsMutationInput?: {
    args: managedCarType[]
  }
}

/**
 * ユーザー情報を送信するMutation
 */
export const updateUserAndManagedCarsMutation = gql`
  mutation Mutation(
    $updateUserMutationInput: UpdateUserMutationInput!
    $upsertManagedCarsMutationInput: UpsertManagedCarsMutationInput!
  ) {
    updateUserMutation(input: $updateUserMutationInput) {
      user {
        givenName
        givenNameRuby
        familyName
        familyNameRuby
        prefecture {
          prefectureCode
        }
        phoneNumber
        birthday
        zipCode
        address1
        address2
        sexuality
        rejectEmail
        email
      }
    }
    upsertManagedCarsMutation(input: $upsertManagedCarsMutationInput) {
      cars {
        uuid
        managedCarAttribute {
          garageNo
        }
      }
    }
  }
`

/**
 * 現在登録されている会員情報を取得した返値の型
 */
export type updateUserAndManagedCarsResponseType = {
  updateUserMutation: {
    user: userType
  }
  upsertManagedCarsMutation: {
    cars: managedCarType[]
  }
}
