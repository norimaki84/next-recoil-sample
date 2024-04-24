/**
 * 記事一覧ページ関係のQueryを設定
 */

import { gql } from 'graphql-request'

/**
 * カテゴリを取得するQuery
 * ※大カテゴリー一覧※
 */
export const articleCategoriesQuery = gql`
  query getArticleCategories($q: BaseScalar!) {
    articleCategories(q: $q) {
      nodes {
        slug
        title
      }
    }
  }
`

/**
 * カテゴリの型
 */
export type ArticleCategoryType = {
  slug: string
  title: string
}

/**
 * カテゴリを取得した返値の型
 * ※大カテゴリー一覧※
 */
export type articleCategoriesResType = {
  articleCategories: {
    nodes: ArticleCategoryType[]
  }
}

/**
 * 複数記事を条件指定して一覧を取得するQuery
 * ※大カテゴリー一覧※
 */
export const articlesQuery = gql`
  query getArticles($q: BaseScalar!, $first: Int!, $after: String!) {
    articles(q: $q, first: $first, after: $after) {
      edges {
        cursor
        node {
          title
          stockStatus
          uuid
          publishedAt
          headline
          articleCategories {
            slug
            title
          }
          thumbnailUrl
          isNew
        }
      }
    }
  }
`

/**
 * 記事の型
 */
export type ArticleType = {
  title: string
  stockStatus: string
  uuid: string
  publishedAt: string
  headline: string
  articleCategories: ArticleCategoryType[]
  thumbnailUrl: string
  isNew: boolean
}

/**
 * 複数記事の型
 */
export type ArticlesType = {
  cursor: string
  node: ArticleType
}

/**
 * qの型
 */
export type BaseScalarType = {
  q: {
    article_taxonomy_slug_eq: string
    article_categories_slug_eq?: string
    s: string
  }
  first: number
  after?: string
}

/**
 * 複数記事を条件指定して一覧を取得した返値の型
 * ※大カテゴリー一覧※
 */
export type articlesQueryResType = {
  articles: {
    edges: ArticlesType[]
  }
}

/**
 * 参考variables
 {
  q: {
      article_taxonomy_slug_eq: "life_with_car", // 大カテゴリー
      article_category_slug_eq: "slug01", // 小カテゴリー
      s: "published_at desc"
    }
}
 */

/**
 * 記事のuuidを指定して記事詳細データを取得するQuery
 */
export const articleDetailQuery = gql`
  query getArticleDetail($uuid: ID!) {
    article(uuid: $uuid) {
      stockStatus
      publishedAt
      title
      keyVisualPcUrl
      keyVisualSpUrl
      headline
      leadText
      articleCategories {
        title
      }
      articleBlocks {
        systemName
        articleBlockContents {
          systemName
          value
        }
      }
    }
  }
`

/**
 * 記事のuuidを指定して記事詳細データを取得した返値の型
 */
export type ArticleDetailQueryResType = {
  article: {
    stockStatus: any
    publishedAt: string
    title: string
    keyVisualPcUrl: string
    keyVisualSpUrl: string
    headline: string
    leadText: string
    articleCategories: {
      title: string
    }[]
    articleBlocks: {
      systemName: string
      articleBlockContents: {
        systemName: string
        value: string
      }[]
    }[]
  }
}

/**
 * TOPページの記事一覧を取得するQuery
 */
export const topArticleQuery = (limit: string) => gql`
  query getTop {
    articlesWithAds(limit: ${limit}) {
      publishedAt
      title
      thumbnailUrl
      headline
      articleCategories {
        title
      }
      isSponsored
      isNew
      uuid
      articleTaxonomySlug
    }
  }
`

/**
 * TOPページの記事一覧を取得した返値の型
 */
export type topQueryResType = {
  articlesWithAds: [
    {
      publishedAt: string
      title: string
      thumbnailUrl: string
      headline: string
      articleCategories: [
        {
          title: string
        },
      ]
      isSponsored: boolean
      isNew: boolean
      uuid: string
      articleTaxonomySlug: string
    },
  ]
}

/**
 * NEWS一覧ページの記事一覧を取得するQuery
 * 初期取得数：5件
 * スクロールして読み込みを後から微調整のため、一旦初期状態25件取得設定
 */
export const newsQuery = gql`
  query getNews {
    articles(q: { article_taxonomy_slug_eq: "news", s: "published_at desc" }, first: 25) {
      nodes {
        thumbnailUrl
        title
        publishedAt
        uuid
      }
    }
  }
`

/**
 * newsの型
 */
export type newsType = {
  thumbnailUrl?: string
  title?: string
  publishedAt?: string
  uuid?: string
}

/**
 * NEWS一覧ページの記事一覧を取得した返値の型
 */
export type newsQueryResType = {
  articles: {
    nodes: newsType[]
  }
}

/**
 * galleryページの記事一覧を取得するQuery
 */
export const galleryQueryAll = gql`
  query getGallery($uuid: ID!) {
    article(uuid: $uuid) {
      survey {
        galleryResponses(after: null, before: null, first: null) {
          nodes {
            nickname
            description
            image
          }
        }
      }
    }
  }
`

/**
 * galleryページの記事一覧を取得するQuery
 */
export const gallery2022SummerQuery = gql`
  query getGallery($uuid: ID!) {
    article(uuid: $uuid) {
      survey {
        galleryResponses(after: null, before: null, first: null) {
          nodes {
            nickname
            description
            image
          }
        }
      }
    }
  }
`

/**
 * galleryページの記事一覧を取得した返値の型
 */
export type galleryQueryResType = {
  article: {
    survey: {
      galleryResponses: {
        nodes: {
          nickname?: string
          image: string
          description?: string
        }[]
      }
    }
  }
}

/**
 * トップページのGallery一覧を取得するQuery
 */
export const topGalleryQueryAll = gql`
  query getTopGallery {
    galleryResponsesFilledWithLatest {
      nickname
      image
      description
    }
  }
`
/**
 * トップページのGallery一覧を取得した返値の型
 */
export type topGalleryQueryResType = {
  galleryResponsesFilledWithLatest: {
    nodes: {
      nickname?: string
      image: string
      description?: string
    }[]
  }
}
