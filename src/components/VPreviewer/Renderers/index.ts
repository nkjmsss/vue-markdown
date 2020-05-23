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
import RListItem from './block/RListItem.vue'
import RMark from './inline/RMark.vue'
import ROrderedList from './block/ROrderedList.vue'
import RParagraph from './block/RParagraph.vue'
import RStrong from './inline/RStrong.vue'
import RTable from './block/RTable.vue'
import RTbody from './block/RTbody.vue'
import RTd from './block/RTd.vue'
import RText from './inline/RText.vue'
import RTh from './block/RTh.vue'
import RThead from './block/RThead.vue'
import RTr from './block/RTr.vue'

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
    type: 'list_item',
    component: RListItem,
  },
  {
    type: 'blockquote',
    component: RBlockquote,
  },
  {
    type: 'table',
    component: RTable,
  },
  {
    type: 'thead',
    component: RThead,
  },
  {
    type: 'tbody',
    component: RTbody,
  },
  {
    type: 'tr',
    component: RTr,
  },
  {
    type: 'td',
    component: RTd,
  },
  {
    type: 'th',
    component: RTh,
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
