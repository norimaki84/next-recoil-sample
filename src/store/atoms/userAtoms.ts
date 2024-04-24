// Recoilで使用するStoreの定義ファイル
import { atom, atomFamily } from 'recoil'

// type userValueType = {
//   userId: string
//   loginStatus: boolean
// }
//
// export const initUserValueState = {
//   userId: '',
//   loginStatus: false,
// }

// export const userValueState = atomFamily<userValueType, userValueType>({
// meクエリで取得したユーザーのuuidの文字列を格納
export const userValueState = atom<string>({
  key: 'User/User_id', // 他のatomやselectorに対して一意のID
  default: '', // デフォルト値(初期値)
})

// meクエリで取得したユーザーステータスの文字列を格納
export const userStatusValueState = atom<string | null>({
  key: 'User/User_status',
  default: null, // デフォルト値(初期値)
})
