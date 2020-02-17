import { VComponent } from '../utils'
import VIcon from './icon/icon'
import VButton from './button/button'
import VInput from './input/input'
import VRadio from './radio/radio'
import VCheckbox from './checkbox/checkbox'
import VSwitch from './switch/switch'
import VCarousel from './carousel/carousel'
import VCarouselList from './carousel/list'
import VCarouselItem from './carousel/item'
import VProgress from './progress/progress'
import VCollapse from './collapse/collapse'

const components: VComponent[] = [
    { name: 'v-icon', component: VIcon },
    { name: 'v-button', component: VButton },
    { name: 'v-input', component: VInput },
    { name: 'v-radio', component: VRadio },
    { name: 'v-checkbox', component: VCheckbox },
    { name: 'v-switch', component: VSwitch },
    { name: 'v-carousel', component: VCarousel },
    { name: 'v-carousel-list', component: VCarouselList },
    { name: 'v-carousel-item', component: VCarouselItem },
    { name: 'v-progress', component: VProgress },
    { name: 'v-collapse', component: VCollapse }
]

export default components