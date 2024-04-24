import { BrandType } from '~/models/brands/brandsQuery'
import { NumberPlatesType } from '~/interfaces/car'

/**
 * carModelの型
 */
export type carModelType = {
  [key: string]: string | undefined
  //- brand: Brand! CarModelに紐づいたBrand
  createdAt?: string // 作成日付
  name?: string //車種名
  updatedAt?: string // 更新日付
  uuid?: string //車種のユニークID UUID(v4)
}

/**
 * prefectureTypeの型
 */
export type prefectureType = {
  [key: string]: string | number | undefined
  name?: string //都道府県名
  prefectureCode?: number
}

/**
 * storeの型
 */
export type storeType = {
  [key: string]: string | prefectureType | BrandType[] | undefined
  //- brands: [Brand!] Storeと紐付くBrandのリスト
  createdAt?: string // 作成日付
  id?: string //ID
  // messageGroups: [MessageGroup!] //Storeと紐付くMessageGroupのリスト
  name?: string // 販売店名
  brands?: BrandType[]
  prefecture?: prefectureType
}

/**
 * managedCarAttributeの型
 */
export type managedCarAttributeType = {
  brand?: string // ブランド名
  carModel?: carModelType // 車種名
  carModelNote?: string | null // 車種（自由入力）
  chassisNumber?: string // 車台番号
  createdAt?: string // 作成日付
  deliveredDate?: string // 納車日
  garageNo?: number // 車庫番号(No.1 ~ No.5まで)
  registrationDate?: string // 登録日
  midtermInspectionDate?: string // 点検日
  inspectionDate?: string // 車検日
  makerId: string // ブランドのメーカーID
  numberPlates?: NumberPlatesType // ナンバープレート
  staffName?: string // 担当者
  store?: storeType //販売店名
  updatedAt?: string // 更新日付
  linkStatus?: 'active' | 'unprocessed' | 'uncompleted' | 'lost'
}

/**
 *
 */
export type carType = {
  imageUrl?: string
  managedCarAttribute?: managedCarAttributeType // 管理車両に関する属性
  isManagedCar?: boolean // 管理車両であればtrue、ヒストリー登録車であればfalse
  carModelText?: string | any // 車種(ユーザ自由入力)
  note?: string // ユーザ自由入力欄
  // ownershipStartedDate?: string // 改修により消滅
  ownershipStartedYear?: number | null // 所有開始「年」
  ownershipStartedMonth?: number | null // 所有開始「月」
  ownershipStartedDay?: number | null // 所有開始「日」
  uuid?: string
}
