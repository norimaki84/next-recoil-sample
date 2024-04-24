/******************************
 ユーザー処理系の型
 ******************************/
/** 仮登録のリクエスト型 */
export type InterimRegistrationRequestType = {
  familyName: string
  givenName: string
  email: string
}

/** 本登録のリクエスト型 */
// export type signUpRequestType = {
//   familyName: string
//   givenName: string,
//   familyNameRuby: string,
//   givenNameRuby: string,
//   password: string,
//   passwordConfirmation: string,
//   birthday: string,
//   phoneNumber: string,
//   zipCode: string,
//   address1: string,
//   address2: string,
//   sexuality: string,
//   prefectureCode: string,
//   approved_terms_version: string,
// }

/** ログインのリクエスト型 */
export type loginRequestType = {
  user: {
    email: string
    password: string
    remember_me: boolean | undefined
  }
}

/** パスワードリマインドメールのリクエスト型 */
export type RemindPassMailRequestType = {
  user: {
    email: string | undefined
  }
}

/** メール認証のトークンを再送信するリクエスト型 */
export type ResendConfirmationMailRequestType = {
  email: string | undefined
}

/** パスワードアップデートのリクエスト型 */
export type PassUpdateRequestType = {
  resetPasswordToken: any
  password: string
  passwordConfirmation: string
}
