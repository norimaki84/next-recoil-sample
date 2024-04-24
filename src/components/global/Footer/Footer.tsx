import React from 'react'
import Link from 'next/link'
import styles from './Footer.module.scss'

export const Footer = (): JSX.Element | null => {
  return (
    <footer className={styles['Footer']}>
      <p className={styles['FooterCopyright']}></p>
    </footer>
  )
}
