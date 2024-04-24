/**
 * PresentページのMutationを設定
 */

import { gql } from 'graphql-request'

/**
 * アンケート情報を送信するMutationへ渡すパラメータの型
 */

type postAnswerType = {
  questionUuid: string | undefined
  value: string | string[] | undefined
}
export type presentPostMutationRequestType = {
  surveyUuid: string | undefined
  answers: postAnswerType[]
}

/**
 * アンケート情報を送信するMutation
 */
export const presentPostMutation = gql`
  mutation presentPost($surveyUuid: ID!, $answers: [AnswerInput!]!) {
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
export type presentPostMutationResponseType = {
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
