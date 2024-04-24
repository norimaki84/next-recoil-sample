import * as Yup from 'yup'
import { sexualityValues } from '~/constants/formData'
import {
  survey0Values,
  // survey1Values,
  // survey2Values,
  // survey3Values,
  // survey4Values,
  // survey5Values,
  // survey6Values,
  // survey7Values,
  // survey8Values,
  // survey9Values,
  // survey10Values,
  // survey11Values,
} from '~/constants/xloungePresent'

export const errorMessageList = {
  required: '入力必須項目です',
  katakana: '全角カタカナで入力してください',
  password: '有効なパスワード形式ではありません',
  passwordConfirm: '確認用パスワードに誤りがあります',
  email: '有効なメールアドレスではありません',
  phoneNumber: '正しい電話番号の形式で入力してください',
  zipCode: '半角数字のみ7桁で入力してください',
  numberPlates_or_chassisNumber: '自動車登録番号または車台番号どちらかを入力してください',
  fileSize: '所定の画像のサイズを選択してください',
  fileArea: '所定の画像のサイズを選択してください',
}

// メールアドレス
const mailSchema = Yup.object({
  email: Yup.string().required(errorMessageList.required).email(errorMessageList.email),
})

// 新しいパスワード
export const passwordSchema = Yup.object({
  password: Yup.string()
    .required(errorMessageList.required)
    .matches(/^(?=.*?[a-zA-Z])(?=.*?\d)[a-zA-Z\d-]{8,16}$/, errorMessageList.password),
})

/*
PwResetSchema : パスワード再設定
PwResetSchemaType
*/
export const PwResetSchema = Yup.object({
  // 新しいパスワード : concat
  // 新しいパスワードの再入力
  passwordConfirm: Yup.string()
    .required(errorMessageList.required)
    .oneOf([Yup.ref('password')], errorMessageList.passwordConfirm),
}).concat(passwordSchema)
export type PwResetSchemaType = Yup.InferType<typeof PwResetSchema>

/*
PwResetInputSchema : パスワードをお忘れの方
PwResetInputSchemaType
*/
export const PwResetInputSchema = Yup.object({}).concat(mailSchema)
export type PwResetInputSchemaType = Yup.InferType<typeof PwResetInputSchema>

/*
TemporarySchema : 新規仮登録
TemporarySchemaType
*/
export const TemporarySchema = Yup.object({
  // お名前
  familyName: Yup.string().required(errorMessageList.required),
  givenName: Yup.string().required(errorMessageList.required),
  // メールアドレス : concat
}).concat(PwResetInputSchema)
export type TemporarySchemaType = Yup.InferType<typeof TemporarySchema>

/*
ProfileCoomonSchema : プロフィール共通
*/
const ProfileCoomonSchema = Yup.object({
  // お名前
  familyName: Yup.string().required(errorMessageList.required),
  givenName: Yup.string().required(errorMessageList.required),
  // お名前（フリガナ）
  familyNameRuby: Yup.string()
    .required(errorMessageList.required)
    .matches(/^[\u30A0-\u30FF]+$/, errorMessageList.katakana),
  givenNameRuby: Yup.string()
    .required(errorMessageList.required)
    .matches(/^[\u30A0-\u30FF]+$/, errorMessageList.katakana),
  // 性別
  sexuality: Yup.mixed()
    .oneOf(sexualityValues as string[], errorMessageList.required)
    .required(errorMessageList.required),
  // 生年月日
  year: Yup.string().required(errorMessageList.required),
  month: Yup.string().required(errorMessageList.required),
  day: Yup.string().required(errorMessageList.required),
  birthday: Yup.string(),
  // 電話番号
  phoneNumber: Yup.string()
    .matches(/[0-9]$/, errorMessageList.phoneNumber) // 半角数字のみ
    .max(11, errorMessageList.phoneNumber) // 最大11文字
    .min(10, errorMessageList.phoneNumber) // 最大10文字
    // .matches(/[0-9]*$/)
    .required(errorMessageList.required),
  // メールアドレス
  email: Yup.string(),
  // パスワード : concat
  // パスワード（確認用）
  /* 住所 */
  // 郵便番号
  zipCode: Yup.string()
    .required(errorMessageList.required)
    // .matches(/^[0-9]{3}-?[0-9]{4}$/, errorMessageList.katakana),
    .matches(/^[0-9]{7}$/, errorMessageList.zipCode), // 半角数字7桁
  // 都道府県
  prefectureCode: Yup.number()
    .moreThan(0, errorMessageList.required)
    .required(errorMessageList.required),
  // 市町村区
  address1: Yup.string().required(errorMessageList.required),
  // 建物名・号室
  address2: Yup.string(),
})

/*
SignupSchema : 新規登録
SignupSchemaType
*/
export const SignupSchema = Yup.object({
  // 都道府県ラベル
  prefectureText: Yup.string(),
  /* Car */
  car: Yup.object({
    //メーカーID
    makerId: Yup.string().required(errorMessageList.required),
    //メーカー名
    makerText: Yup.string(),
    //車種
    //- modelName: Yup.string(),
    // 車種 select
    carModelSelected: Yup.string(),
    // 車種 text
    carModelInputed: Yup.string(),
    // 車種(自由入力) text
    carModelNote: Yup.string(),
    isStoreUnknown: Yup.boolean().test(
      'stores_unknown',
      errorMessageList.required,
      function (value) {
        return (
          (this.parent.storePrefecturesId && this.parent.storeBrandId && this.parent.storeNameId) ||
          value
        )
      },
    ),
    /* 担当店舗 */
    storePrefecturesId: Yup.number().when('isStoreUnknown', {
      is: false,
      then: Yup.number().moreThan(0, errorMessageList.required).required(errorMessageList.required),
    }),
    storeBrandId: Yup.string().when('isStoreUnknown', {
      is: false,
      then: Yup.string().required(errorMessageList.required),
    }),
    storeNameId: Yup.string().when('isStoreUnknown', {
      is: false,
      then: Yup.string().required(errorMessageList.required),
    }),
    storePrefecturesLabel: Yup.string(),
    storeBrandLabel: Yup.string(),
    storeNameLabel: Yup.string(),
    storeId: Yup.number(),
    /* 自動車登録番号 */
    numberPlates: Yup.object({
      // ①地域名
      issuingOffice: Yup.string(),
      // ②分類番号
      classificationNumber: Yup.string(),
      // ③判別文字
      kana: Yup.string(),
      // ④一連指定番号
      registrationNumber: Yup.string(),
    }).when('chassisNumber', {
      is: (val: string) => {
        return val === ''
      },
      then: Yup.object({
        // ①地域名
        issuingOffice: Yup.string()
          .matches(/^[^\x20-\x7e]*$/)
          .required(errorMessageList.required),
        // ②分類番号
        classificationNumber: Yup.string()
          .matches(/^[0-9a-zA-Z]*$/)
          .required(errorMessageList.required),
        // ③判別文字
        kana: Yup.string()
          .matches(/^[^\x20-\x7e]*$/)
          .required(errorMessageList.required),
        // ④一連指定番号
        registrationNumber: Yup.string()
          //- .matches(/^[0-9a-zA-Z]*$/)
          .matches(/^[0-9]*$/)
          .length(4)
          .required(errorMessageList.required),
      }).when(
        [
          'numberPlates.issuingOffice',
          'numberPlates.classificationNumber',
          'numberPlates.kana',
          'numberPlates.registrationNumber',
          'chassisNumber',
        ],
        {
          is: (val: string) => {
            return val !== ''
          },
          then: Yup.object({
            // ①地域名
            issuingOffice: Yup.string()
              .matches(/^[^\x20-\x7e]*$/)
              .required(errorMessageList.required),
            // ②分類番号
            classificationNumber: Yup.string()
              .matches(/^[0-9a-zA-Z]*$/)
              .required(errorMessageList.required),
            // ③判別文字
            kana: Yup.string()
              .matches(/^[^\x20-\x7e]*$/)
              .required(errorMessageList.required),
            // ④一連指定番号
            registrationNumber: Yup.string()
              //- .matches(/^[0-9a-zA-Z]*$/)
              .matches(/^[0-9]*$/)
              .length(4)
              .required(errorMessageList.required),
          }),
        },
      ),
    }),
    // ⑤車台番号
    chassisNumber: Yup.string()
      .matches(/^[0-9a-zA-Z]*$/)
      .test('chassisNumber', errorMessageList.required, function (value) {
        return (
          this.parent.numberPlates.issuingOffice ||
          this.parent.numberPlates.classificationNumber ||
          this.parent.numberPlates.kana ||
          this.parent.numberPlates.registrationNumber ||
          value
        )
      }),
    // 担当者名
    staffName: Yup.string(),
  }),
  // アンケート
  signUpSurveyAnswers: Yup.object({
    question_slug_a: Yup.array(),
    question_slug_b: Yup.object({
      answer1: Yup.string(),
      answer2: Yup.string(),
      answer3: Yup.string(),
    }),
    question_slug_c: Yup.array(),
  }),
})
  .concat(ProfileCoomonSchema)
  .concat(PwResetSchema)
export type SignupSchemaType = Yup.InferType<typeof SignupSchema>

/*
MyCar01Schema : MY CAR No.01 マイカー情報の登録
*/
const MyCar01Schema = Yup.object({
  checkMyCar01: Yup.boolean(),
  // ブランド
  makerId01: Yup.string().when('checkMyCar01', {
    is: true,
    then: Yup.string().required(errorMessageList.required),
  }),
  // 画像の登録
  file01: Yup.string().when('checkMyCar01', {
    is: true,
    then: Yup.string()
      .test('isFileSize', errorMessageList.fileSize, (value) => {
        return !(value === 'sizeError')
      })
      .test('isFileArea', errorMessageList.fileArea, (value) => {
        return !(value === 'areaError')
      }),
  }),
  /* 自動車登録番号 */
  numberPlates01: Yup.object({
    // ①地域名
    issuingOffice: Yup.string(),
    // ②分類番号
    classificationNumber: Yup.string(),
    // ③判別文字
    kana: Yup.string(),
    // ④一連指定番号
    registrationNumber: Yup.string(),
  }).when('checkMyCar01', {
    is: true,
    then: Yup.object({
      // ①地域名
      issuingOffice: Yup.string(),
      // ②分類番号
      classificationNumber: Yup.string(),
      // ③判別文字
      kana: Yup.string(),
      // ④一連指定番号
      registrationNumber: Yup.string(),
    })
      .when('chassisNumber01', {
        is: (val: string) => {
          return val === ''
        },
        then: Yup.object({
          // ①地域名
          issuingOffice: Yup.string()
            .matches(/^[^\x20-\x7e]*$/)
            .required(errorMessageList.required),
          // ②分類番号
          classificationNumber: Yup.string()
            .matches(/^[0-9a-zA-Z]*$/)
            .required(errorMessageList.required),
          // ③判別文字
          kana: Yup.string()
            .matches(/^[^\x20-\x7e]*$/)
            .required(errorMessageList.required),
          // ④一連指定番号
          registrationNumber: Yup.string()
            //- .matches(/^[0-9a-zA-Z]*$/)
            .matches(/^[0-9]*$/)
            .length(4)
            .required(errorMessageList.required),
        }),
      })
      .when(
        [
          'numberPlates01.issuingOffice',
          'numberPlates01.classificationNumber',
          'numberPlates01.kana',
          'numberPlates01.registrationNumber',
          'chassisNumber01',
        ],
        {
          is: (val: string) => {
            return val !== ''
          },
          then: Yup.object({
            // ①地域名
            issuingOffice: Yup.string()
              .matches(/^[^\x20-\x7e]*$/)
              .required(errorMessageList.required),
            // ②分類番号
            classificationNumber: Yup.string()
              .matches(/^[0-9a-zA-Z]*$/)
              .required(errorMessageList.required),
            // ③判別文字
            kana: Yup.string()
              .matches(/^[^\x20-\x7e]*$/)
              .required(errorMessageList.required),
            // ④一連指定番号
            registrationNumber: Yup.string()
              //- .matches(/^[0-9a-zA-Z]*$/)
              .matches(/^[0-9]*$/)
              .length(4)
              .required(errorMessageList.required),
          }),
        },
      ),
  }),
  // ⑤車台番号
  chassisNumber01: Yup.string()
    .matches(/^[0-9a-zA-Z]*$/)
    .when('checkMyCar01', {
      is: true,
      then: Yup.string().test('chassisNumber01', errorMessageList.required, function (value) {
        return (
          this.parent.numberPlates01.issuingOffice ||
          this.parent.numberPlates01.classificationNumber ||
          this.parent.numberPlates01.kana ||
          this.parent.numberPlates01.registrationNumber ||
          value
        )
      }),
    }),

  /* 担当店舗 */
  storePrefectures01: Yup.string().when('isStoreUnknown01', {
    is: 'false',
    then: Yup.string().when('checkMyCar01', {
      is: true,
      then: Yup.string().required(errorMessageList.required),
    }),
  }),
  storeBrand01: Yup.string().when('isStoreUnknown01', {
    is: 'false',
    then: Yup.string().when('checkMyCar01', {
      is: true,
      then: Yup.string().required(errorMessageList.required),
    }),
  }),
  storeName01: Yup.string().when('isStoreUnknown01', {
    is: 'false',
    then: Yup.string().when('checkMyCar01', {
      is: true,
      then: Yup.string().required(errorMessageList.required),
    }),
  }),
  isStoreUnknown01: Yup.string().test(
    'stores_isStoreUnknown01',
    errorMessageList.required,
    function (value) {
      return (
        (this.parent.storePrefectures01 && this.parent.storeBrand01 && this.parent.storeName01) ||
        value
      )
    },
  ),
  staffName01: Yup.string(),
  brand01: Yup.string(),
  carModelSelected01: Yup.string(),
  carModelInputed01: Yup.string(),
  carModelNote01: Yup.string(),
})

/*
MyCar02Schema : MY CAR No.02 マイカー情報の登録
*/
const MyCar02Schema = Yup.object({
  checkMyCar02: Yup.boolean(),
  // ブランド
  makerId02: Yup.string().when('checkMyCar02', {
    is: true,
    then: Yup.string().required(errorMessageList.required),
  }),
  // 画像の登録
  file02: Yup.string()
    .test('isFileSize', errorMessageList.fileSize, (value) => {
      return !(value === 'sizeError')
    })
    .test('isFileArea', errorMessageList.fileArea, (value) => {
      return !(value === 'areaError')
    }),
  /* 自動車登録番号 */
  numberPlates02: Yup.object({
    // ①地域名
    issuingOffice: Yup.string(),
    // ②分類番号
    classificationNumber: Yup.string(),
    // ③判別文字
    kana: Yup.string(),
    // ④一連指定番号
    registrationNumber: Yup.string(),
  }).when('checkMyCar02', {
    is: true,
    then: Yup.object({
      // ①地域名
      issuingOffice: Yup.string(),
      // ②分類番号
      classificationNumber: Yup.string(),
      // ③判別文字
      kana: Yup.string(),
      // ④一連指定番号
      registrationNumber: Yup.string(),
    })
      .when('chassisNumber02', {
        is: (val: string) => {
          return val === ''
        },
        then: Yup.object({
          // ①地域名
          issuingOffice: Yup.string()
            .matches(/^[^\x20-\x7e]*$/)
            .required(errorMessageList.required),
          // ②分類番号
          classificationNumber: Yup.string()
            .matches(/^[0-9a-zA-Z]*$/)
            .required(errorMessageList.required),
          // ③判別文字
          kana: Yup.string()
            .matches(/^[^\x20-\x7e]*$/)
            .required(errorMessageList.required),
          // ④一連指定番号
          registrationNumber: Yup.string()
            //- .matches(/^[0-9a-zA-Z]*$/)
            .matches(/^[0-9]*$/)
            .length(4)
            .required(errorMessageList.required),
        }),
      })
      .when(
        [
          'numberPlates02.issuingOffice',
          'numberPlates02.classificationNumber',
          'numberPlates02.kana',
          'numberPlates02.registrationNumber',
          'chassisNumber02',
        ],
        {
          is: (val: string) => {
            return val !== ''
          },
          then: Yup.object({
            // ①地域名
            issuingOffice: Yup.string()
              .matches(/^[^\x20-\x7e]*$/)
              .required(errorMessageList.required),
            // ②分類番号
            classificationNumber: Yup.string()
              .matches(/^[0-9a-zA-Z]*$/)
              .required(errorMessageList.required),
            // ③判別文字
            kana: Yup.string()
              .matches(/^[^\x20-\x7e]*$/)
              .required(errorMessageList.required),
            // ④一連指定番号
            registrationNumber: Yup.string()
              //- .matches(/^[0-9a-zA-Z]*$/)
              .matches(/^[0-9]*$/)
              .length(4)
              .required(errorMessageList.required),
          }),
        },
      ),
  }),
  // ⑤車台番号
  chassisNumber02: Yup.string()
    .matches(/^[0-9a-zA-Z]*$/)
    .when('checkMyCar02', {
      is: true,
      then: Yup.string().test('chassisNumber02', errorMessageList.required, function (value) {
        return (
          this.parent.numberPlates02.issuingOffice ||
          this.parent.numberPlates02.classificationNumber ||
          this.parent.numberPlates02.kana ||
          this.parent.numberPlates02.registrationNumber ||
          value
        )
      }),
    }),

  /* 担当店舗 */
  storePrefectures02: Yup.string().when('isStoreUnknown02', {
    is: 'false',
    then: Yup.string().when('checkMyCar02', {
      is: true,
      then: Yup.string().required(errorMessageList.required),
    }),
  }),
  storeBrand02: Yup.string().when('isStoreUnknown02', {
    is: 'false',
    then: Yup.string().when('checkMyCar02', {
      is: true,
      then: Yup.string().required(errorMessageList.required),
    }),
  }),
  storeName02: Yup.string().when('isStoreUnknown02', {
    is: 'false',
    then: Yup.string().when('checkMyCar02', {
      is: true,
      then: Yup.string().required(errorMessageList.required),
    }),
  }),
  isStoreUnknown02: Yup.string().test(
    'stores_unknown02',
    errorMessageList.required,
    function (value) {
      return (
        (this.parent.storePrefectures02 && this.parent.storeBrand02 && this.parent.storeName02) ||
        value
      )
    },
  ),
  staffName02: Yup.string(),
  brand02: Yup.string(),
  carModelSelected02: Yup.string(),
  carModelInputed02: Yup.string(),
  carModelNote02: Yup.string(),
})

/*
MyCar03Schema : MY CAR No.03 マイカー情報の登録
*/
const MyCar03Schema = Yup.object({
  checkMyCar03: Yup.boolean(),
  // ブランド
  makerId03: Yup.string().when('checkMyCar03', {
    is: true,
    then: Yup.string().required(errorMessageList.required),
  }),
  // 画像の登録
  file03: Yup.string().when('checkMyCar03', {
    is: true,
    then: Yup.string()
      .test('isFileSize', errorMessageList.fileSize, (value) => {
        return !(value === 'sizeError')
      })
      .test('isFileArea', errorMessageList.fileArea, (value) => {
        return !(value === 'areaError')
      }),
  }),
  /* 自動車登録番号 */
  numberPlates03: Yup.object({
    // ①地域名
    issuingOffice: Yup.string(),
    // ②分類番号
    classificationNumber: Yup.string(),
    // ③判別文字
    kana: Yup.string(),
    // ④一連指定番号
    registrationNumber: Yup.string(),
  }).when('checkMyCar03', {
    is: true,
    then: Yup.object({
      // ①地域名
      issuingOffice: Yup.string(),
      // ②分類番号
      classificationNumber: Yup.string(),
      // ③判別文字
      kana: Yup.string(),
      // ④一連指定番号
      registrationNumber: Yup.string(),
    })
      .when('chassisNumber03', {
        is: (val: string) => {
          return val === ''
        },
        then: Yup.object({
          // ①地域名
          issuingOffice: Yup.string()
            .matches(/^[^\x20-\x7e]*$/)
            .required(errorMessageList.required),
          // ②分類番号
          classificationNumber: Yup.string()
            .matches(/^[0-9a-zA-Z]*$/)
            .required(errorMessageList.required),
          // ③判別文字
          kana: Yup.string()
            .matches(/^[^\x20-\x7e]*$/)
            .required(errorMessageList.required),
          // ④一連指定番号
          registrationNumber: Yup.string()
            //- .matches(/^[0-9a-zA-Z]*$/)
            .matches(/^[0-9]*$/)
            .length(4)
            .required(errorMessageList.required),
        }),
      })
      .when(
        [
          'numberPlates03.issuingOffice',
          'numberPlates03.classificationNumber',
          'numberPlates03.kana',
          'numberPlates03.registrationNumber',
          'chassisNumber03',
        ],
        {
          is: (val: string) => {
            return val !== ''
          },
          then: Yup.object({
            // ①地域名
            issuingOffice: Yup.string()
              .matches(/^[^\x20-\x7e]*$/)
              .required(errorMessageList.required),
            // ②分類番号
            classificationNumber: Yup.string()
              .matches(/^[0-9a-zA-Z]*$/)
              .required(errorMessageList.required),
            // ③判別文字
            kana: Yup.string()
              .matches(/^[^\x20-\x7e]*$/)
              .required(errorMessageList.required),
            // ④一連指定番号
            registrationNumber: Yup.string()
              //- .matches(/^[0-9a-zA-Z]*$/)
              .matches(/^[0-9]*$/)
              .length(4)
              .required(errorMessageList.required),
          }),
        },
      ),
  }),
  // ⑤車台番号
  chassisNumber03: Yup.string()
    .matches(/^[0-9a-zA-Z]*$/)
    .when('checkMyCar03', {
      is: true,
      then: Yup.string().test('chassisNumber03', errorMessageList.required, function (value) {
        return (
          this.parent.numberPlates03.issuingOffice ||
          this.parent.numberPlates03.classificationNumber ||
          this.parent.numberPlates03.kana ||
          this.parent.numberPlates03.registrationNumber ||
          value
        )
      }),
    }),

  /* 担当店舗 */
  storePrefectures03: Yup.string().when('isStoreUnknown03', {
    is: 'false',
    then: Yup.string().when('checkMyCar03', {
      is: true,
      then: Yup.string().required(errorMessageList.required),
    }),
  }),
  storeBrand03: Yup.string().when('isStoreUnknown03', {
    is: 'false',
    then: Yup.string().when('checkMyCar03', {
      is: true,
      then: Yup.string().required(errorMessageList.required),
    }),
  }),
  storeName03: Yup.string().when('isStoreUnknown03', {
    is: 'false',
    then: Yup.string().when('checkMyCar03', {
      is: true,
      then: Yup.string().required(errorMessageList.required),
    }),
  }),
  isStoreUnknown03: Yup.string().test(
    'stores_unknown03',
    errorMessageList.required,
    function (value) {
      return (
        (this.parent.storePrefectures03 && this.parent.storeBrand03 && this.parent.storeName03) ||
        value
      )
    },
  ),
  staffName03: Yup.string(),
  brand03: Yup.string(),
  carModelSelected03: Yup.string(),
  carModelInputed03: Yup.string(),
  carModelNote03: Yup.string(),
})

/*
MyCar04Schema : MY CAR No.04 マイカー情報の登録
*/
const MyCar04Schema = Yup.object({
  checkMyCar04: Yup.boolean(),
  // ブランド
  makerId04: Yup.string().when('checkMyCar04', {
    is: true,
    then: Yup.string().required(errorMessageList.required),
  }),
  // 画像の登録
  file04: Yup.string().when('checkMyCar04', {
    is: true,
    then: Yup.string()
      .test('isFileSize', errorMessageList.fileSize, (value) => {
        return !(value === 'sizeError')
      })
      .test('isFileArea', errorMessageList.fileArea, (value) => {
        return !(value === 'areaError')
      }),
  }),
  /* 自動車登録番号 */
  numberPlates04: Yup.object({
    // ①地域名
    issuingOffice: Yup.string(),
    // ②分類番号
    classificationNumber: Yup.string(),
    // ③判別文字
    kana: Yup.string(),
    // ④一連指定番号
    registrationNumber: Yup.string(),
  }).when('checkMyCar04', {
    is: true,
    then: Yup.object({
      // ①地域名
      issuingOffice: Yup.string(),
      // ②分類番号
      classificationNumber: Yup.string(),
      // ③判別文字
      kana: Yup.string(),
      // ④一連指定番号
      registrationNumber: Yup.string(),
    })
      .when('chassisNumber04', {
        is: (val: string) => {
          return val === ''
        },
        then: Yup.object({
          // ①地域名
          issuingOffice: Yup.string()
            .matches(/^[^\x20-\x7e]*$/)
            .required(errorMessageList.required),
          // ②分類番号
          classificationNumber: Yup.string()
            .matches(/^[0-9a-zA-Z]*$/)
            .required(errorMessageList.required),
          // ③判別文字
          kana: Yup.string()
            .matches(/^[^\x20-\x7e]*$/)
            .required(errorMessageList.required),
          // ④一連指定番号
          registrationNumber: Yup.string()
            //- .matches(/^[0-9a-zA-Z]*$/)
            .matches(/^[0-9]*$/)
            .length(4)
            .required(errorMessageList.required),
        }),
      })
      .when(
        [
          'numberPlates04.issuingOffice',
          'numberPlates04.classificationNumber',
          'numberPlates04.kana',
          'numberPlates04.registrationNumber',
          'chassisNumber04',
        ],
        {
          is: (val: string) => {
            return val !== ''
          },
          then: Yup.object({
            // ①地域名
            issuingOffice: Yup.string()
              .matches(/^[^\x20-\x7e]*$/)
              .required(errorMessageList.required),
            // ②分類番号
            classificationNumber: Yup.string()
              .matches(/^[0-9a-zA-Z]*$/)
              .required(errorMessageList.required),
            // ③判別文字
            kana: Yup.string()
              .matches(/^[^\x20-\x7e]*$/)
              .required(errorMessageList.required),
            // ④一連指定番号
            registrationNumber: Yup.string()
              //- .matches(/^[0-9a-zA-Z]*$/)
              .matches(/^[0-9]*$/)
              .length(4)
              .required(errorMessageList.required),
          }),
        },
      ),
  }),

  // ⑤車台番号
  chassisNumber04: Yup.string()
    .matches(/^[0-9a-zA-Z]*$/)
    .when('checkMyCar04', {
      is: true,
      then: Yup.string().test('chassisNumber04', errorMessageList.required, function (value) {
        return (
          this.parent.numberPlates04.issuingOffice ||
          this.parent.numberPlates04.classificationNumber ||
          this.parent.numberPlates04.kana ||
          this.parent.numberPlates04.registrationNumber ||
          value
        )
      }),
    }),

  /* 担当店舗 */
  storePrefectures04: Yup.string().when('isStoreUnknown04', {
    is: 'false',
    then: Yup.string().when('checkMyCar04', {
      is: true,
      then: Yup.string().required(errorMessageList.required),
    }),
  }),
  storeBrand04: Yup.string().when('isStoreUnknown04', {
    is: 'false',
    then: Yup.string().when('checkMyCar04', {
      is: true,
      then: Yup.string().required(errorMessageList.required),
    }),
  }),
  storeName04: Yup.string().when('isStoreUnknown04', {
    is: 'false',
    then: Yup.string().when('checkMyCar04', {
      is: true,
      then: Yup.string().required(errorMessageList.required),
    }),
  }),
  isStoreUnknown04: Yup.string().test(
    'stores_unknown04',
    errorMessageList.required,
    function (value) {
      return (
        (this.parent.storePrefectures04 && this.parent.storeBrand04 && this.parent.storeName04) ||
        value
      )
    },
  ),
  staffName04: Yup.string(),
  brand04: Yup.string(),
  carModelSelected04: Yup.string(),
  carModelInputed04: Yup.string(),
  carModelNote04: Yup.string(),
})

/*
MyCar05Schema : MY CAR No.05 マイカー情報の登録
*/
const MyCar05Schema = Yup.object({
  checkMyCar05: Yup.boolean(),
  // ブランド
  makerId05: Yup.string().when('checkMyCar05', {
    is: true,
    then: Yup.string().required(errorMessageList.required),
  }),
  // 画像の登録
  file05: Yup.string().when('checkMyCar05', {
    is: true,
    then: Yup.string()
      .test('isFileSize', errorMessageList.fileSize, (value) => {
        return !(value === 'sizeError')
      })
      .test('isFileArea', errorMessageList.fileArea, (value) => {
        return !(value === 'areaError')
      }),
  }),
  /* 自動車登録番号 */
  numberPlates05: Yup.object({
    // ①地域名
    issuingOffice: Yup.string(),
    // ②分類番号
    classificationNumber: Yup.string(),
    // ③判別文字
    kana: Yup.string(),
    // ④一連指定番号
    registrationNumber: Yup.string(),
  }).when('checkMyCar05', {
    is: true,
    then: Yup.object({
      // ①地域名
      issuingOffice: Yup.string(),
      // ②分類番号
      classificationNumber: Yup.string(),
      // ③判別文字
      kana: Yup.string(),
      // ④一連指定番号
      registrationNumber: Yup.string(),
    })
      .when('chassisNumber05', {
        is: (val: string) => {
          return val === ''
        },
        then: Yup.object({
          // ①地域名
          issuingOffice: Yup.string()
            .matches(/^[^\x20-\x7e]*$/)
            .required(errorMessageList.required),
          // ②分類番号
          classificationNumber: Yup.string()
            .matches(/^[0-9a-zA-Z]*$/)
            .required(errorMessageList.required),
          // ③判別文字
          kana: Yup.string()
            .matches(/^[^\x20-\x7e]*$/)
            .required(errorMessageList.required),
          // ④一連指定番号
          registrationNumber: Yup.string()
            //- .matches(/^[0-9a-zA-Z]*$/)
            .matches(/^[0-9]*$/)
            .length(4)
            .required(errorMessageList.required),
        }),
      })
      .when(
        [
          'numberPlates05.issuingOffice',
          'numberPlates05.classificationNumber',
          'numberPlates05.kana',
          'numberPlates05.registrationNumber',
          'chassisNumber05',
        ],
        {
          is: (val: string) => {
            return val !== ''
          },
          then: Yup.object({
            // ①地域名
            issuingOffice: Yup.string()
              .matches(/^[^\x20-\x7e]*$/)
              .required(errorMessageList.required),
            // ②分類番号
            classificationNumber: Yup.string()
              .matches(/^[0-9a-zA-Z]*$/)
              .required(errorMessageList.required),
            // ③判別文字
            kana: Yup.string()
              .matches(/^[^\x20-\x7e]*$/)
              .required(errorMessageList.required),
            // ④一連指定番号
            registrationNumber: Yup.string()
              //- .matches(/^[0-9a-zA-Z]*$/)
              .matches(/^[0-9]*$/)
              .length(4)
              .required(errorMessageList.required),
          }),
        },
      ),
  }),
  // ⑤車台番号
  chassisNumber05: Yup.string()
    .matches(/^[0-9a-zA-Z]*$/)
    .when('checkMyCar05', {
      is: true,
      then: Yup.string().test('chassisNumber05', errorMessageList.required, function (value) {
        return (
          this.parent.numberPlates05.issuingOffice ||
          this.parent.numberPlates05.classificationNumber ||
          this.parent.numberPlates05.kana ||
          this.parent.numberPlates05.registrationNumber ||
          value
        )
      }),
    }),

  /* 担当店舗 */
  storePrefectures05: Yup.string().when('isStoreUnknown05', {
    is: 'false',
    then: Yup.string().when('checkMyCar05', {
      is: true,
      then: Yup.string().required(errorMessageList.required),
    }),
  }),
  storeBrand05: Yup.string().when('isStoreUnknown05', {
    is: 'false',
    then: Yup.string().when('checkMyCar05', {
      is: true,
      then: Yup.string().required(errorMessageList.required),
    }),
  }),
  storeName05: Yup.string().when('isStoreUnknown05', {
    is: 'false',
    then: Yup.string().when('checkMyCar05', {
      is: true,
      then: Yup.string().required(errorMessageList.required),
    }),
  }),
  isStoreUnknown05: Yup.string().test(
    'stores_unknown05',
    errorMessageList.required,
    function (value) {
      return (
        (this.parent.storePrefectures05 && this.parent.storeBrand05 && this.parent.storeName05) ||
        value
      )
    },
  ),
  staffName05: Yup.string(),
  brand05: Yup.string(),
  carModelSelected05: Yup.string(),
  carModelInputed05: Yup.string(),
  carModelNote05: Yup.string(),
})

/*
MygarageSchema : 会員情報編集
MygarageSchemaType
*/
export const MygarageSchema = Yup.object({
  rejectEmail: Yup.mixed(),
})
  .concat(ProfileCoomonSchema)
  .concat(mailSchema)
  .concat(MyCar01Schema)
  .concat(MyCar02Schema)
  .concat(MyCar03Schema)
  .concat(MyCar04Schema)
  .concat(MyCar05Schema)
export type MygarageSchemaType = Yup.InferType<typeof MygarageSchema>

/*
CarInfoSchema : クルマ情報
CarInfoSchemaType
*/
export const CarInfoSchema = Yup.object({
  carName: Yup.string().required(errorMessageList.required),
  year: Yup.string().required(errorMessageList.required),
  // month: Yup.string().required(errorMessageList.required),
  // day: Yup.string().required(errorMessageList.required),
  month: Yup.string(),
  day: Yup.string(),
  file: Yup.string()
    .test('isFileSize', errorMessageList.fileSize, (value) => {
      return !(value === 'sizeError')
    })
    .test('isFileArea', errorMessageList.fileArea, (value) => {
      return !(value === 'areaError')
    }),
})
export type CarInfoSchemaType = Yup.InferType<typeof CarInfoSchema>

/*
LoginSchema : ログイン
LoginSchemaType
*/
export const LoginSchema = Yup.object({
  user: Yup.object({
    // メールアドレス
    email: Yup.string().required(errorMessageList.required),
    // .required(errorMessageList.loginEmailMismatch)
    // パスワード
    password: Yup.string().required(errorMessageList.required),
    // パスワード
    remember_me: Yup.boolean(),
    // .required(errorMessageList.loginPasswordMismatch)
  }),
})
export type LoginSchemaType = Yup.InferType<typeof LoginSchema>

/*
LoginSchema : Owners’ Gallery 応募フォーム
LoginSchemaType
*/
export const XloungeGallerySchema = Yup.object({
  // ニックネーム
  nickname: Yup.string(),
  // 投稿する画像
  file: Yup.string()
    .required(errorMessageList.required)
    .test('isFileSize', errorMessageList.fileSize, (value) => {
      return !(value === 'sizeError')
    })
    .test('isFileArea', errorMessageList.fileArea, (value) => {
      return !(value === 'areaError')
    }),
  // 説明文
  description: Yup.string(),
})
export type XloungeGallerySchemaType = Yup.InferType<typeof XloungeGallerySchema>

/*
PresentSchema : アンケート情報
PresentSchemaType
*/
export const PresentSchema = Yup.object({
  // radio
  survey0: Yup.mixed().oneOf(survey0Values as string[], errorMessageList.required),
  // survey1: Yup.mixed().oneOf(survey1Values as string[], errorMessageList.required),
  // survey2: Yup.mixed().oneOf(survey2Values as string[], errorMessageList.required),
  // survey3: Yup.mixed().oneOf(survey3Values as string[], errorMessageList.required),
  // survey4: Yup.mixed().oneOf(survey4Values as string[], errorMessageList.required),
  // survey5: Yup.mixed().oneOf(survey5Values as string[], errorMessageList.required),
  // survey6: Yup.mixed().oneOf(survey6Values as string[], errorMessageList.required),
  // survey7: Yup.mixed().oneOf(survey7Values as string[], errorMessageList.required),

  // select // TODO:セクレクとタグの項目分の個数を準備
  // survey0: Yup.mixed()
  //   .oneOf(survey0Values as string[], errorMessageList.required)
  //   .required(errorMessageList.required),

  // checkbox
  // survey0: Yup.array()
  //   .nullable()
  //   .min(1, errorMessageList.required)
  //   .required(errorMessageList.required),

  // textarea
  // survey0: Yup.string().required(errorMessageList.required),

  // survey0: Yup.mixed()
  //   .oneOf(survey0Values as string[], errorMessageList.required)
  //   .required(errorMessageList.required),

  // survey1: Yup.mixed()
  //   .oneOf(survey1Values as string[], errorMessageList.required)
  //   .required(errorMessageList.required),
  //
  // survey2: Yup.mixed()
  //   .oneOf(survey2Values as string[], errorMessageList.required)
  //   .required(errorMessageList.required),
  //
  // survey3: Yup.mixed()
  //   .oneOf(survey3Values as string[], errorMessageList.required)
  //   .required(errorMessageList.required),
  //
  // survey4: Yup.mixed()
  //   .oneOf(survey4Values as string[], errorMessageList.required)
  //   .required(errorMessageList.required),
  //
  // survey5: Yup.mixed()
  //   .oneOf(survey5Values as string[], errorMessageList.required)
  //   .required(errorMessageList.required),
  //
  // survey6: Yup.mixed()
  //   .oneOf(survey6Values as string[], errorMessageList.required)
  //   .required(errorMessageList.required),
  //
  // survey7: Yup.mixed()
  //   .oneOf(survey7Values as string[], errorMessageList.required)
  //   .required(errorMessageList.required),
  //
  // survey8: Yup.mixed()
  //   .oneOf(survey8Values as string[], errorMessageList.required)
  //   .required(errorMessageList.required),
  //
  // survey9: Yup.mixed()
  //   .oneOf(survey9Values as string[], errorMessageList.required)
  //   .required(errorMessageList.required),
  //
  // survey10: Yup.mixed()
  //   .oneOf(survey10Values as string[], errorMessageList.required)
  //   .required(errorMessageList.required),
  //
  // survey11: Yup.mixed()
  //   .oneOf(survey11Values as string[], errorMessageList.required)
  //   .required(errorMessageList.required),

  // textarea
  // survey12: Yup.string().required(errorMessageList.required),
  // survey0: Yup.string().required(errorMessageList.required),
})
export type PresentSchemaType = Yup.InferType<typeof PresentSchema>
