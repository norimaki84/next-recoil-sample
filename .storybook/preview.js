import { addDecorator } from '@storybook/react'
import React from 'react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { RecoilRoot } from 'recoil'

import '../src/styles/globals.css' // リセット用のCSSを読み込み

import * as NextImage from 'next/image'

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} placeholder={undefined} unoptimized />,
})

addDecorator((storyFn) => (
  <>
    <RecoilRoot>{storyFn()}</RecoilRoot>
  </>
))

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
