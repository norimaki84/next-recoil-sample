import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import styles from './Header.module.scss'

import Router from 'next/router'
import { useRouter } from 'next/router'

export const Header = (): JSX.Element | null => {
  return (
    <header className={styles['Header']}>
      <div className={styles['HeaderLogo']}>
        <p>Header</p>
      </div>
    </header>
  )
}
