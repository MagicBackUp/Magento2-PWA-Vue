import { VueConstructor, PluginObject } from 'vue'
import VButton from './button'
import { use, registerComponent } from '../../utils/plugins'

const Plugin: PluginObject<any> = {
    install (Vue: VueConstructor) {
        registerComponent(Vue, VButton)
    }
}

use(Plugin)

export default Plugin

export {
    VButton
}