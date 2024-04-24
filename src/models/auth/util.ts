import axios, { AxiosError } from 'axios'
import Router from 'next/router'
import { REPOSITORY_ERROR_MESSAGE } from '~/models/repository/constant'

type ErrorType = {
  error: string
}

const isAxiosError = (error: AxiosError | any): error is AxiosError<ErrorType> => {
  if (axios.isAxiosError(error)) return error.isAxiosError
  else return error
}

const errorObject = {}

/** axios共通エラーハンドル */
export const axiosCommonErrorHandle = (error: any) => {
  // console.log('error', error.code)
  if (isAxiosError(error) && error.response?.status === 400) {
    throw error.response.data
  } else if (isAxiosError(error) && error.response?.status === 401) {
    // throw new Error('401')
    throw error.response.data
  } else if (isAxiosError(error) && error.response?.status === 402) {
    throw new Error(REPOSITORY_ERROR_MESSAGE.cors)
  } else if (isAxiosError(error) && error.response?.status === 422) {
    // エラー時のメッセージとして'422'をcatch側のエラー内容に受け渡し
    // throw new Error('422')
    throw error.response.data
  } else if (isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      // タイムアウトエラーを受け取ったときの処理
      console.log('axios timeout error')
      Router.push('/unexpected-error')
    }
    // throw error.response.data
  }
  throw new Error(REPOSITORY_ERROR_MESSAGE.exception)
}
