// Recoilで使用するStoreの定義ファイル
import { atom } from 'recoil'

export const testValState = atom<string>({
  key: 'testText', // 他のatomやselectorに対して一意のID
  default: '', // デフォルト値(初期値)
})
