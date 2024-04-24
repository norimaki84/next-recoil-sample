import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Meta } from '~/components/Meta'

import styles from './Page02.module.scss'

export const Page02: NextPage = () => {
  return (
    <div className={styles['container']}>
      <Meta id="page02" />
      <h1>page02</h1>
      <ul>
        <li>
          <Link href={'/'}>Top</Link>
        </li>
        <li>
          <Link href={'/page01'}>Page01</Link>
        </li>
      </ul>
    </div>
  )
}
