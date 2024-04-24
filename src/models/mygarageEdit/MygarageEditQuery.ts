import { carType } from '~/models/common/carType'

/**
 * 会員情報編集ページ関係のQueryを設定
 */

import { gql } from 'graphql-request'

/**
 * 現在登録されている会員情報を取得するQuery
 */
export const meQuery = gql`
  query getUserDataMygarageEdit {
    me {
      familyName
      givenName
      familyNameRuby
      givenNameRuby
      sexuality
      birthday
      phoneNumber
      email
      unconfirmedEmail
      zipCode
      prefecture {
        name
        prefectureCode
      }
      address1
      address2
      rejectEmail
    }
  }
`

/*
 * prefectureの型
 */
export type prefectureType = {
  name: string
  prefectureCode: number
}

/*
 * meの型
 */
export type meType = {
  familyName: string
  givenName: string
  familyNameRuby: string
  givenNameRuby: string
  sexuality: string
  birthday: string
  phoneNumber: string
  email: string
  unconfirmedEmail: string
  zipCode: number
  prefecture: prefectureType
  address1: string
  address2: string
  rejectEmail: boolean
}

/**
 * 現在登録されている会員情報を取得した返値の型
 */
export type meQueryResType = {
  me: meType
}

/**
 * cars情報を取得するQuery
 */
export const mygarageEditCarsQuery = gql`
  query getCarsMygarageEdit {
    me {
      cars(editableManagedCars: true) {
        isManagedCar
        imageUrl
        carModelText
        managedCarAttribute {
          garageNo
          makerId
          brand
          linkStatus
          carModel {
            name
          }
          carModelNote
          numberPlates {
            classificationNumber
            issuingOffice
            kana
            registrationNumber
          }
          chassisNumber
          store {
            name
            id
            brands {
              name
              makerId
            }
            prefecture {
              name
              prefectureCode
            }
          }
          staffName
        }
        uuid
      }
    }
  }
`

/**
 * mygarageQueryで取得した返値の型
 */
export type mygarageEditCarsQueryResType = {
  me: {
    cars: carType[]
  }
}
