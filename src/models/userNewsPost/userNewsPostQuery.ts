/**
 * ユーザーお知らせ詳細のQueryを設定
 */

import { gql } from 'graphql-request'

/**
 * ユーザーお知らせ詳細を取得するQuery
 */
export const userNewsDetailQuery = gql`
  query getUserNewsDetail($q: BaseScalar!) {
    me {
      messages(q: $q) {
        nodes {
          title
          scheduledAt
          summary
          imageUrl
          body
          url
        }
      }
    }
  }
`

/**
 * カテゴリの型
 */
export type UserNewsDetailQueryResType = {
  me: {
    messages: {
      nodes: {
        title: string
        scheduledAt: string
        summary: string
        imageUrl: string
        body: string
        url: string
      }[]
    }
  }
}
