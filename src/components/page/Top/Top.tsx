import type { NextPage } from 'next'
import React, { useEffect, useState, ChangeEvent } from 'react'
import Link from 'next/link'


import { Meta } from '~/components/Meta'

import { useRecoilState } from 'recoil'

import { testValState } from '~/store/atoms/commonAtoms'

import styles from './Top.module.scss'

export const Top: NextPage = () => {
  const [text, setText] = useRecoilState(testValState)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
  }

  return (
    <div className={styles['container']}>
      <Meta id="top" />
      <h1>Top</h1>
      <ul>
        <li>
          <Link href={'/page01'}>Page01</Link>
          {/*<a href={'/page01'}>Page01：ただのaタグ</a>*/}
        </li>
        <li>
          <Link href={'/page02'}>Page02</Link>
        </li>
      </ul>
      {/*　*/}
      <div>
        <input type="text" value={text} onChange={handleChange} />
        <p>You entered: {text}</p>
      </div>
      {/*  */}
    </div>
  )
}
