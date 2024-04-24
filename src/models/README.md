# models
GraphQLの通信に関わるモデル定義の設定ファイルを格納するディレクトリです。

## Query
QueryはREST API方式でいうところGET
src/modelsディレクトリ内に各ページやクエリ分類ごとにモデルを定義するディレクトリを作成し、query定義とレスポンスデータの型定義を記述します。
以下は郵便番号を指定して住所データを検索するクエリのサンプルです。

## モデル定義 ※パラメータ固定値 .ver
クエリを叩くときのパタメータ値を固定(ハードコーディング)する場合
```ts
// src/models/zipCode/zipCodeQuery.ts
/**
 * 郵便番号で住所検索のQueryを設定
 */

import { gql } from 'graphql-request'

/**
 * 郵便番号を指定して住所情報を取得するQuery
 * prefectureCode: 都道府県コード
 * city: 市区町村 番地
 * town: 町域番地 ※画面上では建物名・号室
 */
export const zipCodeQuery = gql`
  query getZipCode {
    zipCode(zipcode: "1070062") {
      prefectureCode
      city
      town
    }
  }
`

/**
 * 郵便番号を指定して住所情報を取得した返値の型
 */
export type zipCodeQueryResType = {
  zipCode: {
    prefectureCode: number
    city: string
    town: string
  }
}
```

### 【パラメータ固定値 .ver 抜粋】
```ts
 zipCode(zipcode: "1070062") {
```
上記記述のzipCodeというクエリでzipcodeというパラメータで郵便番号"1070062"を指定しています。
パラメータ値はクエリ定義内に記述されているので使用するコンポーネント内で定義する必要はありません。
```ts
// クエリ定義関係を読み込み
import { zipCodeQuery, zipCodeQueryResType } from '~/models/zipCode/zipCodeQuery'
import useSWR from 'swr'

// graphql-requestのモジュールを読み込み
import { defaultGraphQLClient } from '~/lib/graphqlClient'

// 郵便番号で住所取得サンプル
const { data: zipCodeData } = useSWR<zipCodeQueryResType>(
  [zipCodeQuery],
  (query) => defaultGraphQLClient.request(query),
)
if (zipCodeData !== undefined) console.log('zipCodeData ', zipCodeData)
```




## モデル定義 ※パラメータ可変 .ver
クエリを叩くときのパタメータ値が可変する場合
```ts
// src/models/zipCode/zipCodeQuery.ts
/**
 * 郵便番号で住所検索のQueryを設定
 */

import { gql } from 'graphql-request'

/**
 * 郵便番号を指定して住所情報を取得するQuery
 * prefectureCode: 都道府県コード
 * city: 市区町村 番地
 * town: 町域番地 ※画面上では建物名・号室
 */
export const zipCodeQuery = gql`
  query getZipCode($zipcode: String!) {
    zipCode(zipcode: $zipcode) {
      prefectureCode
      city
      town
    }
  }
`

/**
 * 郵便番号を指定して住所情報を取得した返値の型
 */
export type zipCodeQueryResType = {
  zipCode: {
    prefectureCode: number
    city: string
    town: string
  }
}
```
### 【パラメータ可変 .ver 抜粋】
```ts
  query getZipCode($zipcode: String!) {
  zipCode(zipcode: $zipcode) {
```
上記記述のzipCodeというクエリでzipcodeというパラメータの指定箇所が$zipcodeという変数方式になっています。

実際に使用する場合は可変パラメータを指定してクエリを叩く例は以下です。
```ts
// クエリ定義関係を読み込み
import { zipCodeQuery, zipCodeQueryResType } from '~/models/zipCode/zipCodeQuery'
import useSWR from 'swr'

// graphql-requestのモジュールを読み込み
import { defaultGraphQLClient } from '~/lib/graphqlClient'

// 郵便番号指定で住所取得のクエリのVariables
const ZipCodeVariables = {
  zipcode: '1070062',
}

// 郵便番号で住所取得サンプル
const { data: zipCodeData } = useSWR<zipCodeQueryResType>(
  [zipCodeQuery, ZipCodeVariables],
  (query) => defaultGraphQLClient.request(query, ZipCodeVariables),
)
if (zipCodeData !== undefined) console.log('zipCodeData ', zipCodeData)
```
ZipCodeVariablesというオブジェクトでパラメータを定義して使用するコンポーネント(tsx or ts)ファイルでuseSWRを使用する際にVariablesを受け渡す事で、パラメータの設定値の外出し(分離)が可能です。


## Mutation
MutationはREST API方式でいうところPOSTやPUTなどに相当します
src/modelsディレクトリ内に各ページやクエリ分類ごとにモデルを定義するディレクトリを作成し、mutation定義とリクエストとレスポンスデータの型定義を記述します。
以下はユーザー情報の更新で姓とセイを指定してデータを更新するミューテーションのサンプルです。
### mutationの書き方例
```ts
/**
 * 会員情報編集ページのMutationを設定
 */

import { gql } from 'graphql-request'

// 以下、ユーザーの性とセイを更新するMutationの例
/**
 * ユーザー情報を送信するMutationへ渡すパラメータの型
 */
export type updateUserMutationRequestType = {
  familyName: string // 姓 例:山田
  familyNameRuby: string // セイ 例:ヤマダ
}

/**
 * ユーザー情報を送信するMutation
 */
export const updateUserMutation = gql`
  mutation updateUser($familyName: String, $familyNameRuby: String) {
    updateUserMutation(
      input: { args: { familyName: $familyName, familyNameRuby: $familyNameRuby } }
    ) {
      user {
        familyName
        familyNameRuby
      }
    }
  }
`

/**
 * 現在登録されている会員情報を取得した返値の型
 */
export type updateUserMutationResponseType = {
  updateUserMutation: {
    user: {
      familyName: string
      familyNameRuby: string
    }
  }
}
```

### 使用例
mutationを実行する場合はuseSWRを介さずにgraphql-requestのモジュールに直接使用する方針にします。  
src/repositories/{使用するページコンポーネント名}/repository.tsにAPIの実行関数を定義します。
```ts
// src/repositories/mygarageEdit/repository.ts
// GraphQLクライアントモジュール読み込み
import { defaultGraphQLClient } from '~/lib/graphqlClient'

// Mutationに関係するモデル定義を読み込み
import {
  updateUserMutation,
  updateUserMutationRequestType,
  updateUserMutationResponseType,
} from '~/models/mygarageEdit/MygarageEditMutation'

/**
 * ユーザー情報のアップデートを実行
 */
export const useMygarageEditRepository = () => ({
  /** ユーザー情報のアップデートを実行 */
  async updateUser(args: updateUserMutationRequestType) {
    try {
      console.log('ユーザー情報送信を実行 args:', args)
      const res = await defaultGraphQLClient.request<
        updateUserMutationResponseType,
        updateUserMutationRequestType
        >(updateUserMutation, args)
      console.log('ユーザー情報送信の実行結果:', res)
      return res
    } catch (err) {
      console.log('ユーザー情報送信のerr', err)
      // errorHandle(err)
    }
  },
})
```
定義したAPIの実行関数をmutation処理を実行したいコンポーネントファイルにて読み込んで使用してください。

```ts
import { useMygarageEditRepository } from '~/lib/repositories/mygarageEdit'

const { updateUser } = useMygarageEditRepository()

// submitイベント関数の中で
const mutationData = {
  familyName: '山田',
  familyNameRuby: 'ヤマダ',
}

const res = updateUser(mutationData)
```