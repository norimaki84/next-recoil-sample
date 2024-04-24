# components
ディレクトリ構成の思想は[こちらの記事](https://zenn.dev/yoshiko/articles/99f8047555f700) を参考にしています。

## page
src/pagesディレクトリ


## storiesファイルの作り方

### ファイルの命名ルール
`{name}.stories.tsx`

### 記述方法について
Component Story Format (CSF)に沿った形で記述していきます。  
[公式docs](https://storybook.js.org/docs/react/api/csf) 

### 記述方法サンプル
```ts
import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { MyComponet } from './MyComponet'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'MyComponet',
  component: MyComponet,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof MyComponet>

const Template: ComponentStory<typeof BMyComponet> = (args) => <MyComponet {...args}/>

export const Default = Template.bind({})
Default.args = {
  text: 'テキスト',
}
```