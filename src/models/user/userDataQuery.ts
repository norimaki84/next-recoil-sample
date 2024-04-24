/**
 * ユーザーステータス取得のQueryを設定
 */

import { gql } from 'graphql-request'

/**
 * ユーザーのuuidを取得するQuery
 */
export const userDataQuery = gql`
  query getUserUuid {
    me {
      uuid
    }
  }
`

/**
 * ユーザーのuuidを取得するQueryの返値
 */
export type UserDataQueryResType = {
  me: {
    uuid: string
  }
}

/**
 * 返却されるステータス一覧
 * unregistered：会員情報未入力
 * regular_active：通常アクティブ
 * active_mkid_link_unprocessed：MKID連携未処理アクティブ
 * active_mkid_link_uncompleted：MKID未連携アクティブ
 * active_mkid_link_lost：MKID手放しアクティブ
 * force_activated：強制アクティブ
 */

/**
 * ユーザーのステータスを取得するQuery
 */
export const userStatusQuery = gql`
  query getUserStatus {
    me {
      status
    }
  }
`

/**
 * ユーザーのステータスを取得するQueryの返値
 */
export type UserStatusQueryResType = {
  me: {
    status: string
  }
}

/**
 * 新規会員登録で表示するためのユーザー情報を取得するQuery
 */
export const userDataSignupQuery = gql`
  query getUserData {
    me {
      familyName
      givenName
      email
    }
  }
`

/**
 * 新規会員登録で表示するためのユーザー情報を取得するQueryの返値
 */
export type UserDataSignupQueryResType = {
  me: {
    familyName: string
    givenName: string
    email: string
  }
}
