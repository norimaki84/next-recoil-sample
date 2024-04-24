import { SignUpSurveyDataType } from '~/interfaces/signupForm'

export const SignUpSurveyDataList: SignUpSurveyDataType = {
  question_slug_a: [
    { label: 'スポーツ', value: 'スポーツ' },
    { label: 'グルメ', value: 'グルメ' },
    { label: 'アート・カルチャー', value: 'アート・カルチャー' },
    { label: 'クルマ', value: 'クルマ' },
    { label: 'アウトドア', value: 'アウトドア' },
    { label: 'トラベル', value: 'トラベル' },
    { label: 'ファミリー', value: 'ファミリー' },
    { label: 'ペット', value: 'ペット' },
    { label: '健康・美容', value: '健康・美容' },
    { label: 'ビジネス', value: 'ビジネス' },
    { label: 'ソーシャル<span>（社会貢献など）</span>', value: 'ソーシャル（社会貢献など）' },
  ],
  question_slug_b: {
    answer1: [
      {
        label: 'Aに近い',
        value: 'Aに近い',
      },
      {
        label: 'Aにやや近い',
        value: 'Aにやや近い',
      },
      {
        label: 'Bにやや近い',
        value: 'Bにやや近い',
      },
      {
        label: 'Bに近い',
        value: 'Bに近い',
      },
    ],
    answer2: [
      {
        label: 'Aに近い',
        value: 'Aに近い',
      },
      {
        label: 'Aにやや近い',
        value: 'Aにやや近い',
      },
      {
        label: 'Bにやや近い',
        value: 'Bにやや近い',
      },
      {
        label: 'Bに近い',
        value: 'Bに近い',
      },
    ],
    answer3: [
      {
        label: 'Aに近い',
        value: 'Aに近い',
      },
      {
        label: 'Aにやや近い',
        value: 'Aにやや近い',
      },
      {
        label: 'Bにやや近い',
        value: 'Bにやや近い',
      },
      {
        label: 'Bに近い',
        value: 'Bに近い',
      },
    ],
  },
  question_slug_c: [
    { label: 'ご自身のみ', value: 'ご自身のみ' },
    { label: '配偶者・パートナー', value: '配偶者・パートナー' },
    { label: '恋人', value: '恋人' },
    { label: 'お子様', value: 'お子様' },
    { label: 'ご両親', value: 'ご両親' },
    { label: 'ご友人', value: 'ご友人' },
    { label: 'ペット', value: 'ペット' },
    { label: 'その他', value: 'その他' },
  ],
}
