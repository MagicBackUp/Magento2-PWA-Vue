import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { config, getIcons } from '../../utils'

@Component({
    name: 'v-icon'
})
export default class VIcon extends Vue {
    @Prop([String, Object]) readonly type: string | any
    @Prop(String) readonly component: string | undefined
    @Prop(String) readonly pack: string | undefined
    @Prop(String) readonly icon: string | undefined
    @Prop(String) readonly size: string | undefined
    @Prop(String) readonly customSize: string | undefined
    @Prop(String) readonly customClass: string | undefined
    @Prop(Boolean) readonly both: boolean | undefined

    private get iconConfig () {
        let icons: any = getIcons()
  
        return icons[this.newPack]
    }

    private get iconPrefix () {
        if (this.iconConfig && this.iconConfig.iconPrefix) {
            return this.iconConfig.iconPrefix
        }

        return ''
    }

    private get newIcon () {
        return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon)}`
    }

    private get newPack () {
        return this.pack || config.defaultIconPack
    }

    private get newType () {
        if (!this.type) return false

        let splitType: any[] = []

        if (typeof this.type === 'string') {
            splitType = this.type.split('-')
        } else {
            for (let key in this.type) {
                if (this.type[key]) {
                    splitType = key.split('-')
                    break
                }
            }
        }

        if (splitType.length <= 1) return false
        return `has-text-${splitType[1]}`
    }

    private get newCustomSize () {
        return this.customSize || this.customSizeByPack
    }

    private get customSizeByPack () {
        if (this.iconConfig && this.iconConfig.sizes) {
            if (this.size && this.iconConfig.sizes[this.size] !== undefined) {
                return this.iconConfig.sizes[this.size]
            } else if (this.iconConfig.sizes.default) {
                return this.iconConfig.sizes.default
            }
        }

        return null
    }

    private get useIconComponent () {
        return this.component || config.defaultIconComponent
    }

    public getEquivalentIconOf (value?: string) {
        if (!this.both) {
            return value
        }

        if (this.iconConfig && this.iconConfig.internalIcons && this.iconConfig.internalIcons.value) {
            return this.iconConfig.internalIcons.value
        }

        return value
    }

    protected render (h: CreateElement) {
        return (
            <span class={['icon', this.newType, this.size]}>
                {!this.useIconComponent ? (
                    <i class={[this.newPack, this.newIcon, this.newCustomSize, this.customClass]}></i>
                ) : (
                    <component
                        is={this.useIconComponent}
                        icon={[this.newPack, this.newIcon]}
                        size={this.newCustomSize}
                        class={[this.customClass]}>
                    </component>
                )}
            </span>
        )
    }
}