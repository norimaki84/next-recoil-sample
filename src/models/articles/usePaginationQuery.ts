import { useState, useEffect } from 'react'

import {
  articlesQuery,
  articlesQueryResType,
  ArticlesType,
  BaseScalarType,
} from '~/models/articles/articlesQuery'
import useSWR from 'swr'
import { defaultGraphQLClient } from '~/lib/graphqlClient'

export type PaginationQueryType = {
  taxonomy: string
  first: number
}

export type PaginationQuery = {
  quests: ArticlesType[] | null
  changeCategory: (value: string) => void
  changeSortMode: (value: string) => void
  nextQuery: () => void
}

export const usePaginationQuery = ({ taxonomy, first }: PaginationQueryType): PaginationQuery => {
  const [isScroll, setIsScroll] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [after, setAfter] = useState<string>('')
  const [categoriesSlug, setCategoriesSlug] = useState<string>('')
  const [sortMode, setSortMode] = useState<string>('published_at desc')
  const [quests, setQuests] = useState<ArticlesType[]>([])
  const [articlesVariables, setArticlesVariables] = useState<BaseScalarType>({
    q: {
      article_taxonomy_slug_eq: taxonomy,
      s: 'published_at desc',
    },
    first: first, // スクロールしたときに読み込みたい
    after: '',
  })
  const { mutate: articlesMutate } = useSWR<articlesQueryResType>(
    [articlesQuery, articlesVariables],
    (query) => defaultGraphQLClient.request(query, articlesVariables),
  )

  // リセット
  const reset = () => {
    setIsScroll(false)
    setAfter('')
    setQuests([])
    setPage(0)
  }

  // カテゴリの切り替え
  const changeCategory = (value: string) => {
    reset()
    setCategoriesSlug(value)
  }

  // ソート順の切り替え
  const changeSortMode = (value: string) => {
    reset()
    setSortMode(value + ' desc')
  }

  // 次のデータの取得
  const nextQuery = () => {
    if (isScroll) setPage(page + 1)
  }

  // 切り替えフック
  useEffect(() => {
    const q: {
      article_taxonomy_slug_eq: string
      article_categories_slug_eq?: string
      s: string
    } = {
      article_taxonomy_slug_eq: taxonomy,
      s: sortMode,
    }
    if (categoriesSlug !== '') {
      q.article_categories_slug_eq = categoriesSlug
    }
    setArticlesVariables((prevState: BaseScalarType) => ({
      ...prevState,
      q: q,
      after: '',
    }))
  }, [categoriesSlug, sortMode])

  // quests
  useEffect(() => {
    if (quests.length !== 0) {
      const after = quests?.[quests?.length - 1].cursor
      setAfter(after)
    }
  }, [quests])

  // after
  useEffect(() => {
    //
  }, [after])

  // articlesVariables
  useEffect(() => {
    articlesMutate()
      .then((result: articlesQueryResType | undefined) => {
        if (result && result) {
          const dataList: ArticlesType[] = result?.articles.edges
          if (dataList.length > 0) {
            setQuests(quests.concat(dataList))
            setIsScroll(true)
          }
        }
      })
      .catch()
  }, [articlesVariables])

  // page
  useEffect(() => {
    if (page !== 0) {
      setArticlesVariables((prevState: BaseScalarType) => ({
        ...prevState,
        after: after,
      }))
    }
  }, [page])

  return {
    quests,
    changeCategory,
    changeSortMode,
    nextQuery,
  }
}
