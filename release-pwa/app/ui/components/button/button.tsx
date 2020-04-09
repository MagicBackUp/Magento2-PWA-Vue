import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import config from '../../utils/config'
import VIcon from '../icon/icon'

@Component({
    name: 'v-button',
    components: {
        VIcon
    },
    inheritAttrs: false
})
export default class VButton extends Vue {
    @Prop([String, Object]) readonly type: string | object | any
    @Prop(String) readonly size: string | undefined
    @Prop(String) readonly label: string | undefined
    @Prop(String) readonly iconPack: string | undefined
    @Prop(String) readonly iconLeft: string | undefined
    @Prop(String) readonly iconRight: string | undefined
    @Prop({ default: config.defaultButtonRounded }) readonly rounded: boolean | undefined
    @Prop(Boolean) readonly loading: boolean | undefined
    @Prop(Boolean) readonly outlined: boolean | undefined
    @Prop(Boolean) readonly expanded: boolean | undefined
    @Prop(Boolean) readonly inverted: boolean | undefined
    @Prop(Boolean) readonly focused: boolean | undefined
    @Prop(Boolean) readonly active: boolean | undefined
    @Prop(Boolean) readonly hovered: boolean | undefined
    @Prop(Boolean) readonly selected: boolean | undefined
    @Prop({ default: 'button' }) readonly nativeType: 'button' | 'submit' | 'reset' | undefined
    @Prop({ default: 'button' }) readonly tag: 'a' | 'button' |'input' | 'router-link' | 'nuxt-link' | 'n-link' | 'RouterLink' | 'NuxtLink' | 'NLink' | undefined

    private get computedTag () {
        if (this.$attrs.disabled !== undefined && this.$attrs.disabled) {
            return 'button'
        }
        return this.tag
    }

    private get iconSize () {
        if (!this.size || this.size === 'is-medium') {
            return 'is-small'
        } else if (this.size === 'is-large') {
            return 'is-medium'
        }
        return this.size
    }

    private get hasDefaultSlot () {
        if (!this.$slots.default) return false
        if (this.$slots.default.length > 1) return true
        const text = this.$slots.default[0].text
        return text && !!text.trim()
    }

    protected render (h: CreateElement) {
        const Component: any = this.computedTag
        
        return (
            <Component
                type={this.nativeType}
                class={['button', this.size, this.type, {
                    'is-rounded': this.rounded,
                    'is-loading': this.loading,
                    'is-outlined': this.outlined,
                    'is-fullwidth': this.expanded,
                    'is-inverted': this.inverted,
                    'is-focused': this.focused,
                    'is-active': this.active,
                    'is-hovered': this.hovered,
                    'is-selected': this.selected
                }]}
                {...{attrs: this.$attrs}}
                {...{on: this.$listeners}}>
                {this.iconLeft && (
                    <v-icon
                        pack={this.iconPack}
                        icon={this.iconLeft}
                        size={this.iconSize}
                    ></v-icon>
                )}
                {this.label && (
                    <span>{this.label}</span>
                )}
                {this.hasDefaultSlot && (
                    <span>{this.$slots.default}</span>
                )}
                {this.iconRight && (
                    <v-icon
                        pack={this.iconPack}
                        icon={this.iconRight}
                        size={this.iconSize}
                    ></v-icon>
                )}
            </Component>
        )
    }
}