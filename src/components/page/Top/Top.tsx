import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Meta } from '~/components/Meta'

import styles from './Top.module.scss'

export const Top: NextPage = () => {
  return (
    <div className={styles['container']}>
      <Meta id="top" />
      <h1>Top</h1>
      <ul>
        <li>
          <Link href={'/page01'}>Page01</Link>
        </li>

        <li>
          <Link href={'/page02'}>Page02</Link>
        </li>
      </ul>
    </div>
  )
}
