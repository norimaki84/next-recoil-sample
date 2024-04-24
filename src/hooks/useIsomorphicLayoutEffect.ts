import { useEffect, useLayoutEffect } from 'react'

// windowが使用できる環境(クライアント環境)だったらuseLayoutEffectを使用
// サーバー環境だったらuseEffectを使用
// ※クライアント環境でないとuseLayoutEffectを使用できないため
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default useIsomorphicLayoutEffect
