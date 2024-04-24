import Head from 'next/head'
import { metaData } from '~/constants/metaData'

type Props = {
  id: string
  title?: string
  uuid?: string
}

const Meta = ({ id, title, uuid }: Props): JSX.Element | null => {
  const data = metaData.pages.find((page: { id: string }) => page.id === id)
  if (!data) return null

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, maximum-scale=1, minimum-scale=1, initial-scale=1, user-scalable=no"
        />
        {title ? <title>{title}</title> : <title>{data.title}</title>}
        <meta name="description" content={data.description} />
        <meta name="keywords" content={data.keywords} />
        {data.shareType === 'default' && (
          <>
            {title ? (
              <meta property="og:title" content={title} />
            ) : (
              <meta property="og:title" content={data.title} />
            )}
            <meta property="og:description" content={data.description} />
            {uuid ? (
              <meta property="og:url" content={metaData.base.domain + data.path + uuid} />
            ) : (
              <meta property="og:url" content={metaData.base.domain + data.path} />
            )}
            <meta property="og:image" content={metaData.base.domain + metaData.base.ogp} />
            {title ? (
              <meta name="twitter:title" content={title} />
            ) : (
              <meta name="twitter:title" content={data.title} />
            )}
            <meta name="twitter:description" content={data.description} />
            <meta name="twitter:card" content={'summary_large_image'} />
            <meta name="twitter:image" content={metaData.base.domain + metaData.base.ogp} />
            {uuid ? (
              <meta name="twitter:domain" content={metaData.base.domain + data.path + uuid} />
            ) : (
              <meta name="twitter:domain" content={metaData.base.domain + data.path} />
            )}
          </>
        )}
        {data.shareType === 'login' && (
          <>
            <meta property="og:title" content={metaData.pages[9].title} />
            <meta property="og:description" content={metaData.pages[0].description} />
            <meta property="og:url" content={metaData.base.domain + metaData.pages[9].path} />
            <meta property="og:image" content={metaData.base.domain + metaData.base.ogp} />
            <meta property="twitter:title" content={metaData.pages[9].title} />
            <meta name="twitter:description" content={metaData.pages[0].description} />
            <meta name="twitter:card" content={'summary_large_image'} />
            <meta name="twitter:image" content={metaData.base.domain + metaData.base.ogp} />
            <meta name="twitter:domain" content={metaData.base.domain + metaData.pages[9].path} />
          </>
        )}
        {/*<link*/}
        {/*  rel="apple-touch-icon"*/}
        {/*  href="https://yanase-xfield.jp/assets/images/common/webclip.png"*/}
        {/*/>*/}
        {/*<link rel="icon" href="/favicon.ico" />*/}
        <link rel="canonical" href={metaData.base.domain + data.path} />
        {data.noindex && <meta name="robots" content="noindex,nofollow" />}
      </Head>
    </>
  )
}

export { Meta }
