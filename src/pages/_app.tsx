import * as React from 'react'
import { AppProps } from 'next/app'
import { RecoilRoot, useRecoilState } from 'recoil'

import '../styles/globals.css'
import '../styles/common.scss'

declare const window: Window['window'] & {
  dataLayer: object[]
}

const MyApp = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  return (
    <>
      <RecoilRoot>
        <Component {...pageProps} key={router.route} />
      </RecoilRoot>
    </>
  )
}

export default MyApp
