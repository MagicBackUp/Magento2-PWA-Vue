import { VueConstructor, ComponentOptions } from 'vue'
import components from './components'
import {
    config,
    merge,
    setOptions,
    setVueInstance,
    use,
    registerComponent,
    registerComponentProgrammatic,
    VComponent
} from './utils'

const Vui: any = {
    install (Vue: VueConstructor, options: ComponentOptions<Vue> = {}) {
        setVueInstance(Vue)
        setOptions(merge(config, options, true))

        components.forEach((item: VComponent) => {
            registerComponent(Vue, item)
        })

        const VuiProgrammatic: any = {
            getOptions () {
                return config
            },
            setOptions (options : any) {
                setOptions(merge(config, options, true))
            }
        }

        registerComponentProgrammatic(Vue, 'config', VuiProgrammatic)
    }
}

use(Vui)

export default Vui