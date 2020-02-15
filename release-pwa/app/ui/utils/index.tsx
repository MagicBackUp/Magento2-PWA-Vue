import config, { setOptions, setVueInstance } from './config'
import { merge } from './helpers'
import { use, registerComponent, registerComponentProgrammatic, VComponent } from './plugins'
import getIcons from './icons'
import VElementMixins from './element'

export {
    config,
    merge,
    setOptions,
    setVueInstance,
    use,
    getIcons,
    registerComponent,
    registerComponentProgrammatic,
    VComponent,
    VElementMixins
}