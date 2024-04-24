import { metaDataType } from '~/interfaces/meta'

const metaData: metaDataType = {
  base: {
    domain: 'https://hogehoge.jp',
    ogp: '/assets/images/common/og.png',
  },
  pages: [
    {
      // A-01-02：告知LP
      id: 'top',
      title: 'top',
      description: '',
      keywords: '',
      path: '',
      noindex: false,
      shareType: 'default',
    },
    {
      // page01
      id: 'page01',
      title: 'page01',
      description: '',
      keywords: '',
      path: '/page01/',
      noindex: false,
      shareType: 'default',
    },
    {
      // page02
      id: 'page02',
      title: 'page02',
      description: '',
      keywords: '',
      path: '/page02/',
      noindex: false,
      shareType: 'default',
    },
  ],
}

export { metaData }
