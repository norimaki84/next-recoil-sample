/******************************
 GraphQL
 'graphql-request'はGraphQLを簡単に使えるクライアントライブラリ
 https://github.com/prisma-labs/graphql-request
 GraphQLへのパスは.env.localで管理している
 ******************************/

import { GraphQLClient } from 'graphql-request'

const envInfo = {
  endpointDomain: process.env.NEXT_PUBLIC_GRAPHQL_END_POINT || 'localhost',
}

export const defaultGraphQLClient = new GraphQLClient(envInfo.endpointDomain, {
  credentials: 'include',
  mode: 'cors',
})
defaultGraphQLClient.setHeader('X-Requested-With', 'XMLHttpRequest')
