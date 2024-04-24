import { useState, useEffect } from 'react'

import {
  mygarageMessagesQuery,
  mygarageMessagesResType,
  MessageConnection,
  messagesType,
  messageType,
  pageInfoType,
} from '~/models/mygarage/MygarageQuery'
import useSWR from 'swr'
import { defaultGraphQLClient } from '~/lib/graphqlClient'

export type MessagesQueryType = {
  initAfter: string | null
  first: number
}

export type MessagesQuery = {
  messageDataList: messageType[] | null
  setMessageDataList: (messageDataList: messageType[]) => void
  initMessagesData: (messages: messageType[], pageInfo: pageInfoType) => void
  isMessagesHasNextPage: boolean
  nextMessagesQuery: () => void
}

export const useMessagesQuery = ({ initAfter, first }: MessagesQueryType): MessagesQuery => {
  const [page, setPage] = useState<number>(0)
  const [currentAfter, setCurrentAfter] = useState<string>('')
  const [pageInfo, setPageInfo] = useState<pageInfoType>(null!)
  const [messageDataList, setMessageDataList] = useState<messageType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isMessagesHasNextPage, setIsMessagesHasNextPage] = useState<boolean>(false)
  const [messagesVariables, setMessagesVariables] = useState<MessageConnection>({
    first: first,
    after: initAfter,
  })
  const { mutate: messagesMutate } = useSWR<mygarageMessagesResType>(
    [mygarageMessagesQuery, messagesVariables],
    (query) => defaultGraphQLClient.request(query, messagesVariables),
  )

  // 次のデータの取得
  const nextMessagesQuery = () => {
    if (isLoading) return
    setIsLoading(true)
    setPage(page + 1)
  }

  // afterの設定
  const initMessagesData = (messages: messageType[], pageInfo: pageInfoType) => {
    setMessageDataList(messages)
    setPageInfo(pageInfo)
  }

  // after
  useEffect(() => {
    if (pageInfo) {
      setCurrentAfter(pageInfo?.endCursor)
      setIsMessagesHasNextPage(pageInfo?.hasNextPage)
    }
  }, [pageInfo])

  // messagesVariables
  useEffect(() => {
    messagesMutate()
      .then((result: mygarageMessagesResType | undefined) => {
        if (result) {
          const messages: messagesType = result?.me.messages
          const nodes: messageType[] = messages.nodes
          if (messages.pageInfo) setPageInfo(messages.pageInfo)
          if (nodes.length > 0) {
            setMessageDataList(messageDataList.concat(nodes))
          }
          setIsLoading(false)
        }
      })
      .catch()
  }, [messagesVariables])

  // page
  useEffect(() => {
    if (page !== 0) {
      setMessagesVariables((prevState: MessageConnection) => ({
        ...prevState,
        after: currentAfter,
      }))
    }
  }, [page])

  return {
    messageDataList,
    setMessageDataList,
    initMessagesData,
    nextMessagesQuery,
    isMessagesHasNextPage,
  }
}
