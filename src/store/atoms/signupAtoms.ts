import { atom, atomFamily } from 'recoil'
import { SignupFormValuesType } from '~/interfaces/signupForm'

export const initSignupFormValues = {
  familyName: '',
  givenName: '',
  familyNameRuby: '',
  givenNameRuby: '',
  password: '',
  passwordConfirm: '',
  car: {
    chassisNumber: '',
    makerId: '',
    makerText: '',
    //- modelName: '',
    // carModelSelected: '',
    // carModelInputed: '',
    carModelNote: '',
    staffName: '',
    storePrefecturesId: 0,
    storeBrandId: '',
    storeNameId: '',
    storePrefecturesLabel: '',
    storeBrandLabel: '',
    storeNameLabel: '',
    storeId: undefined,
    isStoreUnknown: false,
    numberPlates: {
      issuingOffice: '',
      classificationNumber: '',
      kana: '',
      registrationNumber: '',
    },
  },
  sexuality: '',
  year: '',
  month: '',
  day: '',
  //- birthday: '',
  phoneNumber: '',
  email: '',
  zipCode: '',
  prefectureCode: 0,
  address1: '',
  address2: '',
  //- brand: '',
  signUpSurveyAnswers: {
    question_slug_a: [],
    question_slug_b: {
      answer1: '',
      answer2: '',
      answer3: '',
    },
    question_slug_c: [],
  },
}

export const signupFormValuesState = atomFamily<SignupFormValuesType, SignupFormValuesType>({
  key: 'Signup/SignupFormValues',
  default: initSignupFormValues,
})
