import { carType } from '~/models/common/carType'

/**
 * 会員情報編集ページ関係のQueryを設定
 */

import { gql } from 'graphql-request'

/**
 * mygarageで必要な情報を取得するQuery
 * ※2023/03 代替車両サジェスト用クエリ追加(alternativeCar)
 */
export const mygarageQuery = gql`
  query getUserDataMygarage {
    me {
      familyName
      givenName
      alternativeCar {
        brand {
          makerId
          name
        }
        modelNote
        registrationDate
      }
      cars(editableManagedCars: true) {
        imageUrl
        carModelText
        managedCarAttribute {
          garageNo
          linkStatus
          brand
          carModel {
            name
          }
          carModelNote
          registrationDate
          midtermInspectionDate
          inspectionDate
          store {
            name
          }
          staffName
        }
      }
      messages(after: null, before: null, first: 3, last: null) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        nodes {
          scheduledAt
          summary
          imageUrl
          uuid
        }
      }
      responses(after: null, first: 3, q: { s: "created_at DESC" }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        nodes {
          createdAt
          survey {
            article {
              articleCategories {
                title
              }
            }
          }
          answers(q: { question_text_eq: "投稿する画像" }) {
            value
          }
        }
      }
    }
  }
`

/**
 * messagesを取得するQuery
 */
export const mygarageMessagesQuery = gql`
  query getMessages($after: String, $first: Int!) {
    me {
      messages(after: $after, first: $first) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        nodes {
          scheduledAt
          summary
          imageUrl
          uuid
        }
      }
    }
  }
`

/**
 * responsesを取得するQuery
 */
export const mygarageResponsesQuery = gql`
  query getApplicationHistory($after: String, $first: Int!) {
    me {
      responses(after: $after, first: $first, q: { s: "created_at DESC" }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        nodes {
          createdAt
          survey {
            article {
              articleCategories {
                title
              }
            }
          }
          answers(q: { question_text_eq: "投稿する画像" }) {
            value
          }
        }
      }
    }
  }
`

/**
 * paramの型
 */
export type MessageConnection = {
  first: number
  after?: string | null
}
export type ResponseConnection = {
  first: number
  after?: string | null
}

/**
 * mygarageResponsesQueryで取得した返値の型
 */
export type mygarageResponsesResType = {
  me: {
    responses: responsesType
  }
}

/**
 * mygarageMessagesQueryで取得した返値の型
 */
export type mygarageMessagesResType = {
  me: {
    messages: messagesType
  }
}

/**
 * pageInfoの型
 */
export type pageInfoType = {
  startCursor: string
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
}

/**
 * responseの型
 */
export type responseType = {
  createdAt: string
  survey: {
    article: {
      articleCategories: [
        {
          title: string
        },
      ]
    }
  }
  answers: [
    {
      value: string
    },
  ]
}

/**
 * responsesの型
 */
export type responsesType = {
  pageInfo: pageInfoType
  nodes: responseType[]
}

/**
 * messageの型
 */
export type messageType = {
  scheduledAt?: string
  summary?: string
  imageUrl?: string
  uuid?: string
}

/**
 * messagesの型
 */
export type messagesType = {
  pageInfo: pageInfoType
  nodes: messageType[]
}

/**
 * mygarageQueryで取得した返値の型
 * ※2023/03 代替車両サジェスト用クエリ追加(alternativeCar)
 */
export type mygarageQueryResType = {
  me: {
    familyName: string
    givenName: string
    alternativeCar: {
      brand:
        | {
            makerId: string // メーカーID
            name: string // ブランド名テキスト
          }
        | null
        | undefined
      modelNote: string | null | undefined // 車種(自由入力)テキスト
      registrationDate: string | undefined | any // 登録日
    }
    cars: carType[]
    messages: messagesType
    responses: responsesType
  }
}
