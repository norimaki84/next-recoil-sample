/******************************
 MY CAR HISTORYページ関係のAPIを実行
 ******************************/
// GraphQLクライアントモジュール読み込み
import { defaultGraphQLClient } from '~/lib/graphqlClient'

// Mutationに関係するモデル定義を読み込み
import {
  // ヒストリー登録車の更新
  updateMyCarHistoryMutationRequestType,
  updateMyCarHistoryMutation,
  updateNoteMyCarHistoryMutation, // noteのみの更新
  updateMyCarHistoryMutationResponseType,

  // マイカーの更新
  upsertManagedCarMutationRequestType,
  upsertManagedCarMutation,
  upsertManagedCarMutationResponseType,

  // ヒストリー登録車の削除
  destroyHistoryCarMutationRequestType,
  destroyHistoryCarMutation,
  destroyHistoryCarMutationResponseType,

  // マイカーの削除
  destroyManagedCarMutationRequestType,
  destroyManagedCarMutation,
  destroyManagedCarMutationResponseType,

  // ヒストリー登録車の生成
  createHistoryCarMutationRequestType,
  createHistoryCarMutation,
  createHistoryCarMutationResponseType,
} from '~/models/mygarageHistory/MygarageHistoryMutation'

/**
 * ヒストリー登録車の更新
 */
export const useUpdateMyCarHistoryRepository = () => ({
  async updateMyCarHistory(args: updateMyCarHistoryMutationRequestType) {
    try {
      console.log('ヒストリー登録車の更新 args:', args)
      const res = await defaultGraphQLClient.request<
        updateMyCarHistoryMutationResponseType,
        updateMyCarHistoryMutationRequestType
      >(updateMyCarHistoryMutation, args)
      console.log('ヒストリー登録車の更新 送信の実行結果:', res)
      return res
    } catch (err) {
      console.log('ヒストリー登録車の更新 送信のerr', err)
      // errorHandle(err)
    }
  },
})

/**
 * ヒストリー登録車の更新（note）
 */
export const useUpdateNoteMyCarHistoryRepository = () => ({
  async updateNoteMyCarHistory(args: updateMyCarHistoryMutationRequestType) {
    try {
      console.log('ヒストリー登録車の更新（note） args:', args)
      const res = await defaultGraphQLClient.request<
        updateMyCarHistoryMutationResponseType,
        updateMyCarHistoryMutationRequestType
      >(updateNoteMyCarHistoryMutation, args)
      console.log('ヒストリー登録車の更新（note） 送信の実行結果:', res)
      return res
    } catch (err) {
      console.log('ヒストリー登録車の更新（note） 送信のerr', err)
      // errorHandle(err)
    }
  },
})

/**
 * マイカーの更新
 */
export const useUpsertManagedCarRepository = () => ({
  async upsertManagedCar(args: upsertManagedCarMutationRequestType) {
    try {
      console.log('マイカーの更新 args:', args)
      const res = await defaultGraphQLClient.request<
        upsertManagedCarMutationResponseType,
        upsertManagedCarMutationRequestType
      >(upsertManagedCarMutation, args)
      console.log('マイカーの更新 送信の実行結果:', res)
      return res
    } catch (err) {
      console.log('マイカーの更新 送信のerr', err)
      // errorHandle(err)
    }
  },
})

/**
 * ヒストリー登録車の削除
 */
export const useDestroyHistoryCarRepository = () => ({
  async destroyHistoryCar(args: destroyHistoryCarMutationRequestType) {
    try {
      console.log('ヒストリー登録車の削除 args:', args)
      const res = await defaultGraphQLClient.request<
        destroyHistoryCarMutationResponseType,
        destroyHistoryCarMutationRequestType
      >(destroyHistoryCarMutation, args)
      console.log('ヒストリー登録車の削除 送信の実行結果:', res)
      return res
    } catch (err) {
      console.log('ヒストリー登録車の削除 送信のerr', err)
      // errorHandle(err)
    }
  },
})

/**
 * マイカーの削除
 */
export const useDestroyManagedCarRepository = () => ({
  async destroyManagedCar(args: destroyManagedCarMutationRequestType) {
    try {
      console.log('マイカーの削除の削除 args:', args)
      const res = await defaultGraphQLClient.request<
        destroyManagedCarMutationResponseType,
        destroyManagedCarMutationRequestType
      >(destroyManagedCarMutation, args)
      console.log('マイカーの削除の削除 送信の実行結果:', res)
      return res
    } catch (err) {
      console.log('マイカーの削除の削除 送信のerr', err)
      // errorHandle(err)
    }
  },
})

/**
 * ヒストリー登録車の生成
 */
export const useCreateHistoryCarRepository = () => ({
  async createHistoryCar(args: createHistoryCarMutationRequestType) {
    try {
      console.log('ヒストリー登録車の生成 args:', args)
      const res = await defaultGraphQLClient.request<
        createHistoryCarMutationResponseType,
        createHistoryCarMutationRequestType
      >(createHistoryCarMutation, args)
      console.log('ヒストリー登録車の生成 送信の実行結果:', res)
      return res
    } catch (err) {
      console.log('ヒストリー登録車の生成 送信のerr', err)
      // errorHandle(err)
    }
  },
})
