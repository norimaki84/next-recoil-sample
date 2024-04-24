/**
 * Owner's GalleryページのMutationを設定
 */

import { gql } from 'graphql-request'

// 以下、ユーザーの性とセイを更新するMutationの例
/**
 * ユーザー情報を送信するMutationへ渡すパラメータの型
 */

type postAnswerType = {
  questionUuid: string
  value: string | undefined
}
export type ownersGalleryPostMutationRequestType = {
  surveyUuid: string | undefined
  answers: postAnswerType[]
}

/**
 * ユーザー情報を送信するMutation
 */
export const ownersGalleryPostMutation = gql`
  mutation ownersGalleryPost($surveyUuid: ID!, $answers: [AnswerInput!]!) {
    answerSurveyMutation(input: { args: { surveyUuid: $surveyUuid, answers: $answers } }) {
      response {
        answers {
          question {
            text
          }
          value
        }
      }
    }
  }
`

/**
 * 現在登録されている会員情報を取得した返値の型
 */
export type ownersGalleryPostMutationResponseType = {
  answerSurveyMutation: {
    answers: [
      {
        question: {
          text: string
        }
        value: string
      },
    ]
  }
}
