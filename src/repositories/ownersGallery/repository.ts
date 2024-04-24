/******************************
 Owner's Galleryページ関係のAPIを実行
 ******************************/
// GraphQLクライアントモジュール読み込み
import { defaultGraphQLClient } from '~/lib/graphqlClient'

// Mutationに関係するモデル定義を読み込み
import {
  ownersGalleryPostMutation,
  ownersGalleryPostMutationRequestType,
  ownersGalleryPostMutationResponseType,
} from '~/models/ownersGallery/OwnersGalleryMutation'

/**
 * Owner's Galleryの応募情報の送信を実行
 */
export const useOwnersGalleryRepository = () => ({
  /** Owner's Galleryの応募情報の送信を実行 */
  async postOwnersGalleryData(args: ownersGalleryPostMutationRequestType) {
    try {
      // console.log('Owners Galleryの応募情報送信を実行 args:', args)
      const res = await defaultGraphQLClient.request<
        ownersGalleryPostMutationResponseType,
        ownersGalleryPostMutationRequestType
      >(ownersGalleryPostMutation, args)
      // console.log('Owners Galleryの応募情報送信の実行結果:', res)
      return res
    } catch (err) {
      // console.log('Owners Galleryの応募情報送信のerr', err)
      // errorHandle(err)
    }
  },
})
