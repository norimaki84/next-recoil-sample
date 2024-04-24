// 自動車登録番号
export type NumberPlatesType = {
  [key: string]: string | number | undefined
  issuingOffice?: string | undefined //地域名
  classificationNumber?: string | undefined //分類番号
  kana?: string | undefined //判別文字
  registrationNumber?: number | string | undefined //一連指定番号
}
