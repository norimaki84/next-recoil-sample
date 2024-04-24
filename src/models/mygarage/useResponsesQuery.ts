import { useState, useEffect } from 'react'

import {
  mygarageResponsesQuery,
  mygarageResponsesResType,
  ResponseConnection,
  responsesType,
  responseType,
  pageInfoType,
} from '~/models/mygarage/MygarageQuery'
import useSWR from 'swr'
import { defaultGraphQLClient } from '~/lib/graphqlClient'

export type ResponsesQueryType = {
  initAfter: string | null
  first: number
}

export type ResponsesQuery = {
  responseDataList: responseType[] | null
  setResponseDataList: (responseDataList: responseType[]) => void
  initResponsesData: (messages: responseType[], pageInfo: pageInfoType) => void
  isResponsesHasNextPage: boolean
  nextResponsesQuery: () => void
}

export const useResponsesQuery = ({ initAfter, first }: ResponsesQueryType): ResponsesQuery => {
  const [page, setPage] = useState<number>(0)
  const [currentAfter, setCurrentAfter] = useState<string>('')
  const [pageInfo, setPageInfo] = useState<pageInfoType>(null!)
  const [responseDataList, setResponseDataList] = useState<responseType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isResponsesHasNextPage, setIsResponsesHasNextPage] = useState<boolean>(false)
  const [responsesVariables, setResponseVariables] = useState<ResponseConnection>({
    first: first, // TODO:追加読み込みのデータ取得数を設定
    after: initAfter,
  })
  const { mutate: responsesMutate } = useSWR<mygarageResponsesResType>(
    [mygarageResponsesQuery, responsesVariables],
    (query) => defaultGraphQLClient.request(query, responsesVariables),
  )

  useEffect(() => {
    //- setIsResponsesHasNextPage(responseDataList.length > first)
  }, [responseDataList])

  // 次のデータの取得
  const nextResponsesQuery = () => {
    if (isLoading) return
    setIsLoading(true)
    setPage(page + 1)
  }

  // afterの設定
  const initResponsesData = (messages: responseType[], pageInfo: pageInfoType) => {
    setResponseDataList(messages)
    setPageInfo(pageInfo)
  }

  // after
  useEffect(() => {
    if (pageInfo) {
      setCurrentAfter(pageInfo?.endCursor)
      setIsResponsesHasNextPage(pageInfo?.hasNextPage)
    }
  }, [pageInfo])

  // responsesVariables
  useEffect(() => {
    responsesMutate()
      .then((result: mygarageResponsesResType | undefined) => {
        if (result) {
          const responses: responsesType = result?.me.responses
          const nodes: responseType[] = responses.nodes
          if (responses.pageInfo) setPageInfo(responses.pageInfo)
          if (nodes.length > 0) {
            setResponseDataList(responseDataList.concat(nodes))
          }
          setIsLoading(false)
        }
      })
      .catch()
  }, [responsesVariables])

  // page
  useEffect(() => {
    if (page !== 0) {
      setResponseVariables((prevState: ResponseConnection) => ({
        ...prevState,
        after: currentAfter,
      }))
    }
  }, [page])

  return {
    responseDataList,
    nextResponsesQuery,
    setResponseDataList,
    initResponsesData,
    isResponsesHasNextPage,
  }
}
