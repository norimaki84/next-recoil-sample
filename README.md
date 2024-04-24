# YANASE X FILED フロントエンドアプリ
YANASE X FILED フロントエンドアプリのリポジトリです。

## Description
- SJ開発環境URL： [https://yanase-xfield.sjdev.jp](https://yanase-xfield.sjdev.jp)  
  【Basic認証】  
  ID：xfield  
  PASS：dev

## Getting Started

Install dependencies:

```bash
npm install
# or
yarn install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Development environment
- macOS Monterey 12.2
- Node v16.14.2

## Requirements
- Next.js：v12.1.0
- TypeScript：v4.3.5
- Recoil：v0.5.2
- SWR：v1.2.1
- ESLint：v7.32.0
- Prettier：v2.5.1
- Storybook-addon-next：v1.6.1 ※StorybookはNext.js用のaddon経由でインストール
- Jest：v27.5.1

## Env setting
### 【APIサーバーの種類】※7/7時点
- 言語社テストサーバー
- クライアントステージングサーバー
- クライアント本番サーバー  

上記3つのサーバーが存在しております。これまで開発で使用してきているサーバーは「言語社テストサーバー」となります。

### 【dev】開発者モードでローカルサーバーを立ち上げ
**dev**：読み込むAPIは**言語社テストサーバー**  
**dev:staging**：読み込むAPIは**クライアントステージングサーバー**  
※開発者モードで本番APIを読み込ませる必要性はないのでタスクは用意しておりません  

### 【build】ビルドタスク
**build**：読み込むAPIは**言語社テストサーバー**でビルドを実行  
**build:staging**：読み込むAPIは**クライアントステージングサーバー**でビルドを実行  
**build:production**：読み込むAPIは**クライアント本番サーバー**でビルドを実行  

### 【export】デプロイ用にファイルを出力
**export:dev**：読み込むAPIは**言語社テストサーバー**でビルドをファイルを出力  
**export:staging**：読み込むAPIは**クライアントステージングサーバー**でファイルを出力  
**export:production**：読み込むAPIは**クライアント本番サーバー**でファイルを出力  

### 【start】それぞれの環境で本番モードでサーバーを立ち上げ
**start:dev**：読み込むAPIは**言語社テストサーバー**で本番モードでサーバーを立ち上げ    
**start:staging**：読み込むAPIは**クライアントステージングサーバー**で本番モードでサーバーを立ち上げ  
**start:production**：読み込むAPIは**クライアント本番サーバー**で本番モードでサーバーを立ち上げ  
※この場合の「本番モード」はNext.jsのフレームワーク上のサーバーの立ち上げの種類を意味しており、クライアント本番サーバーのことではない

## License
MIT License.

## Authors
[Norikazu Teraguchi](https://github.com/norimaki84)