import { VueConstructor } from 'vue'
import RBlockquote from './block/RBlockquote.vue'
import RBulletList from './block/RBulletList.vue'
import RCode from './inline/RCode.vue'
import RDefault from './RDefault.vue'
import REm from './inline/REm.vue'
import RFence from './block/RFence.vue'
import RHeading from './block/RHeading.vue'
import RImage from './block/RImage.vue'
import RIns from './inline/RIns.vue'
import RLink from './inline/RLink.vue'
import RMark from './inline/RMark.vue'
import ROrderedList from './block/ROrderedList.vue'
import RParagraph from './block/RParagraph.vue'
import RStrong from './inline/RStrong.vue'
import RText from './inline/RText.vue'

export type Components = {
  type: string | RegExp
  component: VueConstructor
}[]

const blocks: Components = [
  {
    type: 'paragraph',
    component: RParagraph,
  },
  {
    type: 'heading',
    component: RHeading,
  },
  {
    type: 'image',
    component: RImage,
  },
  {
    type: 'fence',
    component: RFence,
  },
  {
    type: 'bullet_list',
    component: RBulletList,
  },
  {
    type: 'ordered_list',
    component: ROrderedList,
  },
  {
    type: 'blockquote',
    component: RBlockquote,
  },
]

const inline: Components = [
  {
    type: 'text',
    component: RText,
  },
  {
    type: 'code_inline',
    component: RCode,
  },
  {
    type: 'mark',
    component: RMark,
  },
  {
    type: 'em',
    component: REm,
  },
  {
    type: 'ins',
    component: RIns,
  },
  {
    type: 'strong',
    component: RStrong,
  },
  {
    type: 'link',
    component: RLink,
  },
]

export const components: Components = [...blocks, ...inline]
export const fallbackComponent = RDefault
