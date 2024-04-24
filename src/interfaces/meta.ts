export type routeNameList = 'top' | 'page01' | 'page02'

// Meta要素の型定義
export type pageDataType = {
  id: routeNameList
  title: string
  description: string
  keywords: string
  path: string
  noindex: boolean
  shareType: 'default' | 'login'
}

export type metaDataType = {
  base: {
    domain: string
    ogp: string
  }
  // meta: {
  //   domain: string
  //   ogpImagePath: string
  //   type: 'website' | 'article'
  //   websiteName: string
  // }
  pages: pageDataType[]
}
