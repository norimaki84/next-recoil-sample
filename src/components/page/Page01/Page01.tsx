import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Meta } from '~/components/Meta'

import styles from './Page01.module.scss'

export const Page01: NextPage = () => {
  return (
    <div className={styles['container']}>
      <Meta id="page01" />
      <h1>page01</h1>
      <ul>
        <li>
          <Link href={'/'}>Top</Link>
        </li>

        <li>
          <Link href={'/page02'}>Page02</Link>
        </li>
      </ul>
    </div>
  )
}
