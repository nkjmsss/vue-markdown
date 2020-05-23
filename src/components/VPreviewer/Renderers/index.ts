import { VueConstructor } from 'vue'
import RCode from './inline/RCode.vue'
import RDefault from './RDefault.vue'
import REm from './inline/REm.vue'
import RHeading from './block/RHeading.vue'
import RImage from './block/RImage.vue'
import RIns from './inline/RIns.vue'
import RLink from './inline/RLink.vue'
import RMark from './inline/RMark.vue'
import RStrong from './inline/RStrong.vue'
import RText from './inline/RText.vue'

export type Components = {
  type: string | RegExp
  component: VueConstructor
}[]

const blocks: Components = [
  {
    type: 'heading',
    component: RHeading,
  },
  {
    type: 'image',
    component: RImage,
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
