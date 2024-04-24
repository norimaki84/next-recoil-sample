import { OptionType } from '~/interfaces/form'
import { NumberPlatesType } from '~/interfaces/car'

// 車
export type CarType = {
  [key: string]: string | number | boolean | undefined | NumberPlatesType
  chassisNumber: string | undefined //車台番号
  makerId: string | undefined //ブランドID
  makerText?: string | undefined
  //- modelName: string | undefined //車種
  carModelSelected?: string | undefined
  carModelInputed?: string | undefined
  carModelNote?: string | undefined
  staffName: string | undefined //担当者名
  storeId?: number | undefined //担当店舗ID(確認画面で生成)
  isStoreUnknown: boolean | undefined //不明・分からない
  numberPlates?: NumberPlatesType //自動車登録番号
  storePrefecturesId?: number | undefined
  storeBrandId?: string | undefined
  storeNameId?: string | undefined
  storePrefecturesLabel?: string | undefined
  storeBrandLabel?: string | undefined
  storeNameLabel?: string | undefined
}

// アンケート
export type SignUpSurveyDataType = {
  question_slug_a: OptionType[]
  question_slug_b: {
    answer1: OptionType[]
    answer2: OptionType[]
    answer3: OptionType[]
  }
  question_slug_c: OptionType[]
}

type SignUpSurveyAnswersType = {
  question_slug_a: string[] | undefined
  question_slug_b: {
    answer1: string | undefined
    answer2: string | undefined
    answer3: string | undefined
  }
  question_slug_c: string[] | undefined
}

export type AnswersType = {
  slug: string
  answer: string | undefined
}

type signUpSurveyAnswersPostType = {
  slug: string
  answers: AnswersType[]
}

type CommonSignupType = {
  familyName?: string | undefined
  givenName?: string | undefined
  familyNameRuby?: string | undefined
  givenNameRuby?: string | undefined
  password?: string | undefined
  passwordConfirm?: string | undefined
  car?: CarType | undefined
  phoneNumber?: string | undefined
  zipCode?: string | undefined
  address1?: string | undefined
  address2?: string | undefined
  sexuality?: string | undefined
  email?: string | undefined
  prefectureCode?: number
}

// 新規登録
export type SignupFormValuesType = {
  [key: string]:
    | string
    | CarType
    | number
    | signUpSurveyAnswersPostType[]
    | SignUpSurveyAnswersType
    | undefined
  year: string
  month: string
  day: string
  //- brand: string
  // carModelSelected: string | undefined
  // carModelInputed: string | undefined
  signUpSurveyAnswers: SignUpSurveyAnswersType
} & CommonSignupType

// 新規登録 POST用
export type SignupPostType = {
  [key: string]:
    | string
    | CarType
    | number
    | signUpSurveyAnswersPostType[]
    | SignUpSurveyAnswersType
    | undefined
  birthday?: string | undefined
  approved_terms_version?: string
  signUpSurveyAnswers?: signUpSurveyAnswersPostType[]
} & CommonSignupType
