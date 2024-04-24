/******************************
 Presentページ関係のAPIを実行
 ******************************/
// GraphQLクライアントモジュール読み込み
import { defaultGraphQLClient } from '~/lib/graphqlClient'

// Mutationに関係するモデル定義を読み込み
import {
  presentPostMutation,
  presentPostMutationRequestType,
  presentPostMutationResponseType,
} from '~/models/present/PresentMutation'

/**
 * Presentの応募情報の送信を実行
 */
export const usePresentRepository = () => ({
  /** Presentの応募情報の送信を実行 */
  async postPresentData(args: presentPostMutationRequestType) {
    try {
      console.log('Presentの応募情報送信を実行 args:', args)
      const res = await defaultGraphQLClient.request<
        presentPostMutationResponseType,
        presentPostMutationRequestType
      >(presentPostMutation, args)
      console.log('Presentの応募情報送信の実行結果:', res)
      return res
    } catch (err) {
      console.log('Presentの応募情報送信のerr', err)
      // errorHandle(err)
    }
  },
})
