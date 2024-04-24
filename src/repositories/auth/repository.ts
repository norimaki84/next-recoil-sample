/******************************
 ユーザーログイン処理・パスワード再設定
 ******************************/
import axios from 'axios'
import {
  InterimRegistrationRequestType,
  RemindPassMailRequestType,
  PassUpdateRequestType,
  loginRequestType,
  ResendConfirmationMailRequestType,
} from '~/models/auth/type'
import { axiosCommonErrorHandle } from '~/models/auth/util'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAuthRepository = () => ({
  /** 仮登録を行う(POST) */
  async interimRegistration({ ...args }: InterimRegistrationRequestType) {
    try {
      const data = await axios.post('users/interim_registrations', args, { timeout: 30000 }) // 暫定でタイムアウトエラーを30秒指定

      // APIのレスポンスを結果をモジュールの使用先でも読み込めるように
      return data
    } catch (err) {
      axiosCommonErrorHandle(err)
    }
  },

  /** メール認証のトークンをチェック(GET) */
  async loginTicket(token: any) {
    const apiEndpoint = 'users/login_ticket?confirmation_token=' + token
    // console.log('apiEndpoint', apiEndpoint)
    try {
      const data = await axios.get(apiEndpoint, { timeout: 30000 }) // 暫定でタイムアウトエラーを30秒指定

      // APIのレスポンスを結果をモジュールの使用先でも読み込めるように
      return data
    } catch (err) {
      axiosCommonErrorHandle(err)
    }
  },

  /** メール認証のトークンをチェック(GET) */
  async checkToken(token: any) {
    const apiEndpoint = 'users/confirmation?confirmation_token=' + token
    // console.log('apiEndpoint', apiEndpoint)
    try {
      const data = await axios.get(apiEndpoint, { timeout: 30000 }) // 暫定でタイムアウトエラーを30秒指定

      // APIのレスポンスを結果をモジュールの使用先でも読み込めるように
      return data
    } catch (err) {
      axiosCommonErrorHandle(err)
    }
  },

  /** 本登録を行う(POST) */
  // 現状はSignupConfirm.tsxの中で直接記述している
  // async signUp({ ...args }: loginRequestType) {
  //   try {
  //     await console.log(args)
  //     // const data = await axios.post('users/password', args)
  //
  //     // APIのレスポンスを結果をモジュールの使用先でも読み込めるように
  //     // return data
  //   } catch (err) {
  //     console.log(err)
  //     axiosCommonErrorHandle(err)
  //   }
  // },

  /** ユーザーログイン(POST) */
  async login({ ...args }: loginRequestType) {
    try {
      const data = await axios.post('users/sign_in', args, { timeout: 30000 }) // 暫定でタイムアウトエラーを30秒指定

      // APIのレスポンスを結果をモジュールの使用先でも読み込めるように
      return data
    } catch (err) {
      axiosCommonErrorHandle(err)
    }
  },

  /** ユーザーログアウト(DELETE) */
  async logout() {
    try {
      await axios.delete('users/sign_out')
    } catch (err) {
      axiosCommonErrorHandle(err)
    }
  },

  /** パスワードリマインドメールの送付(POST) */
  async remindPassMail({ ...args }: RemindPassMailRequestType) {
    try {
      const data = await axios.post('users/password', args, { timeout: 30000 }) // 暫定でタイムアウトエラーを30秒指定

      // APIのレスポンスを結果をモジュールの使用先でも読み込めるように
      return data
    } catch (err) {
      axiosCommonErrorHandle(err)
    }
  },

  /** メール認証のトークンを再送信する(POST) */
  async resendConfirmationMail({ ...args }: ResendConfirmationMailRequestType) {
    try {
      const data = await axios.post('users/resend_confirmation', args, { timeout: 30000 }) // 暫定でタイムアウトエラーを30秒指定

      // APIのレスポンスを結果をモジュールの使用先でも読み込めるように
      return data
    } catch (err) {
      axiosCommonErrorHandle(err)
    }
  },

  /** パスワードリマインダーからのパスワードの更新(PUT) */
  async passUpdate({ ...args }: PassUpdateRequestType) {
    try {
      const data = await axios.put('users/password/update', args, { timeout: 30000 }) // 暫定でタイムアウトエラーを30秒指定

      // APIのレスポンスを結果をモジュールの使用先でも読み込めるように
      return data
    } catch (err) {
      axiosCommonErrorHandle(err)
    }
  },
})
