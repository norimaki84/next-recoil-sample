/******************************
 会員情報編集ページ関係のAPIを実行
 ******************************/
// GraphQLクライアントモジュール読み込み
import { defaultGraphQLClient } from '~/lib/graphqlClient'
import Router from 'next/router'

// Mutationに関係するモデル定義を読み込み
import {
  updateUserAndManagedCarsMutation,
  updateUserAndManagedCarsMutationRequestType,
  updateUserAndManagedCarsResponseType,
} from '~/models/mygarageEdit/MygarageEditMutation'

// エラーハンドリング関数
// const errorHandle = (err: any) => {
//   //TODO: Axiosのようなエラーハンドリングを作る
//   let errors = ''
//   if (err.response?.errors.length) {
//     errors = err.response?.errors?.reduce((prev, cur) => {
//       console.error(cur.message)
//       if (prev) return prev + '\\n' + cur.message
//       else return cur.message
//     }, '')
//   }
//   throw new Error(`エラー：\n${errors}`)
// }

/**
 * ユーザー情報のアップデートを実行
 */
export const useMygarageEditRepository = () => ({
  /** ユーザー情報のアップデートを実行 */
  async updateUserAndManagedCars(args: updateUserAndManagedCarsMutationRequestType) {
    try {
      // console.log('ユーザー情報送信を実行 args:', args)
      const res = await defaultGraphQLClient.request<
        updateUserAndManagedCarsResponseType,
        updateUserAndManagedCarsMutationRequestType
      >(updateUserAndManagedCarsMutation, args)
      console.log('ユーザー情報送信の実行結果:', res)
      return res
    } catch (err: any) {
      if (err) {
        const reqRes = JSON.parse(JSON.stringify(err))
        // console.log('ユーザー情報送信のerr：', reqRes.response.errors[0].message)
        if (reqRes.response.errors[0].message === 'MKID has already been taken') {
          // console.log('MKID重複エラー')
          await Router.push('/duplicate-error')
        } else {
          // 予期せぬエラー
          await Router.push('/unexpected-error')
        }
      }
    }
  },
})
