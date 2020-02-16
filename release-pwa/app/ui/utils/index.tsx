import config, { setOptions, setVueInstance } from './config'
import { merge, sign } from './helpers'
import { use, registerComponent, registerComponentProgrammatic, VComponent } from './plugins'
import getIcons from './icons'
import VElementMixins from './element'
import VRadioMixins from './radio'

export {
    config,
    merge,
    sign,
    setOptions,
    setVueInstance,
    use,
    getIcons,
    registerComponent,
    registerComponentProgrammatic,
    VComponent,
    VElementMixins,
    VRadioMixins
}