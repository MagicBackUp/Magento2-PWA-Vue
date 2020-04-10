import { VueConstructor, PluginObject } from 'vue'
import VSteps from './steps'
import VStepItem from './item'
import { use, registerComponent } from '../../utils/plugins'

const Plugin: PluginObject<any> = {
    install (Vue: VueConstructor) {
        registerComponent(Vue, VSteps)
        registerComponent(Vue, VStepItem)
    }
}

use(Plugin)

export default Plugin

export {
    VSteps,
    VStepItem
}