import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { config } from '../../utils'

@Component({
    name: 'v-tooltip'
})
export default class VTooltip extends Vue {
    @Prop({ default: true }) readonly active: boolean | any
    @Prop(String) readonly type: string | undefined
    @Prop(String) readonly label: string | undefined
    @Prop({ default: 'is-top' }) readonly position: 'is-top' | 'is-bottom' | 'is-left' | 'is-right' | undefined
    @Prop(Boolean) readonly always: boolean | undefined
    @Prop(Boolean) readonly animated: boolean | undefined
    @Prop(Boolean) readonly square: boolean | undefined
    @Prop(Boolean) readonly dashed: boolean | undefined
    @Prop(Boolean) readonly multilined: boolean | undefined
    @Prop({ default: 'is-medium' }) readonly size: string | undefined
    @Prop(Number) readonly delay: number | undefined

    private get newType () {
        return this.type || config.defaultTooltipType
    }

    private get newAnimated () {
        return this.animated || config.defaultTooltipAnimated
    }

    private get newDelay () {
        return this.delay || config.defaultTooltipDelay
    }

    protected render (h: CreateElement) {
        return (
            <span
                data-label={this.label}
                class={[this.newType, this.position, this.size, {
                    'b-tooltip': this.active,
                    'is-square': this.square,
                    'is-animated': this.newAnimated,
                    'is-always': this.always,
                    'is-multiline': this.multilined,
                    'is-dashed': this.dashed
                }]}
                style={[{'transition-delay': `${this.newDelay}ms`}]}>
                {this.$slots.default}
            </span>
        )
    }
}