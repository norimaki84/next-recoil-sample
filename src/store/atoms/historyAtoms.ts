import { atom } from 'recoil'

export const historyState = atom<string>({
  key: 'history',
  default: '',
})
