import { VueConstructor } from 'vue'

export interface VComponent {
    name: string
    component: VueConstructor
}

export const use: Function = (plugin: any) => {
    if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin)
    }
}

export const registerComponent: Function = (Vue: VueConstructor, component: VComponent) => {
    if (component.name) Vue.component(component.name, component.component)
}

export const registerComponentProgrammatic = (Vue: VueConstructor, property: string, component: any) => {
    if (!Vue.prototype.$vui) Vue.prototype.$vui = {}
    Vue.prototype.$vui[property] = component
}