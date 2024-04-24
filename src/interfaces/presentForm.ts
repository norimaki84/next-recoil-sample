export type SurveyType = 'check' | 'select' | 'radio' | 'textarea'

export type SurveyErrorType = {
  message?: string | undefined
  ref?:
    | {
        type?: string | undefined
        name?: string | undefined
      }
    | undefined
  type?: string | undefined
}

export type SurveyItemsDataType = {
  [key: string]: SurveyType | string | string[] | any
  survey_type: SurveyType | string
  survey_title: string
  survey_item?: string[] | undefined
}

export type PresentFormDataType = {
  overview_text: string
  form_items: SurveyItemsDataType[]
  term_text: string
}

export type PresentFormValuesType = string[] | string[][]
