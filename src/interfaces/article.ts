// 記事詳細要素の型定義
// 記事詳細のサムネイルエリアの方定義
export type ArticleItemType = {
  title: string
  headline_text?: string
  head_image: {
    pc_image: string
    sp_image: string
  }
  date?: {
    year?: number
    month?: number
    day?: number
  }
  category_text?: string[]
  lead_text?: string
}

// 記事要素の種類の型定義
export type SystemNameType =
  | 'lead_text_block'
  | 'general_paragraph'
  | 'heading_20'
  | 'heading_30'
  | 'image'
  | 'movie/text'
  | 'youtube/text'
  | 'image|text'
  | 'text|image'
  | 'image/text|image/text'
  | 'image/text|image/text|image/text'
  | 'simple_html'
  | 'links'
  | 'button_ec'

// 繰り返し要素の型定義
export type ArticleBlockContentsType = {
  systemName: string
  value: string
}
export type ArticleBlocksType = {
  systemName: string
  articleBlockContents: ArticleBlockContentsType[]
}
