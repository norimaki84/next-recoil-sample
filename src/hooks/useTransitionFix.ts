// https://github.com/vercel/next.js/issues/17464

import Router from 'next/router'
import { useEffect } from 'react'

export const OPACITY_EXIT_DURATION = 1

const referrerArray: any[] = []

const routeChange = () => {
  // console.log('Router.router?.asPath', Router.router?.asPath)
  // referrerArray.push(Router.router?.asPath)
  // if (referrerArray.length >= 2) {
  //   console.log('クリア')
  //   referrerArray.length = 0
  // }
  // console.log('referrerArray', referrerArray.length)
  // setTimeout(() => {
  //   referrerArray.length = 0
  //   console.log('referrerArray after', referrerArray.length)
  // }, 2000)
  const tempFix = () => {
    const elements = document.querySelectorAll('style[media="x"]')
    elements.forEach((elem) => elem.removeAttribute('media'))
    setTimeout(() => {
      elements.forEach((elem) => elem.remove())
      // }, OPACITY_EXIT_DURATION * 1000)
    }, 500)
  }
  if (
    Router.router?.asPath === '/temporary/' ||
    Router.router?.asPath === '/login/' ||
    Router.router?.asPath === '/top/' ||
    Router.router?.asPath === '/pw-reset-input/' ||
    Router.router?.asPath === '/terms/' ||
    Router.router?.asPath === '/privacy-policy/' ||
    Router.router?.asPath === '/law/' ||
    Router.router?.asPath === '/faq/' ||
    Router.router?.asPath === '/unexpected-error/'
  ) {
    // var count_value = 0;
    // console.log('referrerArray[0]', referrerArray[0])
    // console.log('referrerArray[1]', referrerArray[1])
    // referrerArray.length = 0
    // if (referrerArray.length === 2) {
    //   if (referrerArray[0] === '/login/' && referrerArray[1] === '/top/') {
        // console.log('ログインアニメーション')
      // }
      // console.log('発火')
    // }
    tempFix()
  } else {
    // console.log('通常遷移')
  }
}

// type Props = {}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useTransitionFix = () => {
  useEffect(() => {
    Router.events.on('routeChangeComplete', routeChange)
    Router.events.on('routeChangeStart', routeChange)

    return () => {
      Router.events.off('routeChangeComplete', routeChange)
      Router.events.off('routeChangeStart', routeChange)
    }
  }, [])

  useEffect(() => {
    Router.router?.push(Router.router?.asPath)
  }, [])
}
