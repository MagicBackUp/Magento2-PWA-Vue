import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import VIcon from '../icon/icon'
import { Template } from 'webpack'

@Component({
    name: 'v-rate',
    components: {
        VIcon
    },
    inheritAttrs: false,
})
export default class VRate extends Vue {
    @Prop({ default: 0 }) readonly value: number | any
    @Prop({ default: 5 }) readonly max: number | any
    @Prop({ default: 'star' }) readonly icon: string | undefined
    @Prop(String) readonly iconPack: string | undefined
    @Prop(String) readonly size: string | undefined
    @Prop(String) readonly spaced: boolean | undefined
    @Prop(Boolean) readonly rtl: boolean | undefined
    @Prop(Boolean) readonly disabled: boolean | undefined
    @Prop(Boolean) readonly showScore: boolean | undefined
    @Prop(Boolean) readonly showText: boolean | undefined
    @Prop(String) readonly customText: string | any
    @Prop(Array) readonly texts: any[] | any

    @Watch('value')
    onValueChanged(value: any) {
        this.newValue = value
    }

    public newValue: number = this.value
    public hoverValue: number = 0

    private get halfStyle () {
        return `width:${this.valueDecimal}%`
    }

    private get showMe () {
        let result: any = ''

        if (this.showScore) {
            result = this.disabled ? this.value : this.newValue
            if (result === 0) result = ''
        } else if (this.showText) {
            result = this.texts[Math.ceil(this.newValue) - 1]
        }

        return result
    }

    private get valueDecimal () {
        return this.value * 100 - Math.floor(this.value) * 100
    }

    public resetNewValue () {
        if (this.disabled) return false
        this.hoverValue = 0
    }

    public previewRate (index: number, event: any) {
        if (this.disabled) return false
        this.hoverValue = index
        event.stopPropagation()
    }

    public confirmValue (index: number) {
        if (this.disabled) return false
        this.newValue = index + 1
        this.$emit('change', this.newValue)
        this.$emit('input', this.newValue)
    }

    public checkHalf (index: number) {
        let showWhenDisabled = this.disabled && this.valueDecimal > 0 &&
        index - 1 < this.value && index > this.value
        return showWhenDisabled
    }

    public rateClass (index: number) {
        let output: any = ''
        const currentValue = this.hoverValue !== 0 ? this.hoverValue : this.newValue
        if (index <= currentValue) {
            output = 'set-on'
        } else if (this.disabled && (Math.ceil(this.value) === index)) {
            output = 'set-half'
        }
        return output
    }

    protected render (h: CreateElement) {
        const isShow: boolean = this.showText || this.showScore || this.customText
        const generateItem: Function = (len: number) => {
            let rates: any[] = []

            for(let i = 0; i < len; i++) {
                rates.push(
                    <div class={['rate-item', this.rateClass(i)]} key={i}
                        onMousemove={(e: Event) => { this.previewRate(i, e) }}
                        onMouseleave={() => { this.resetNewValue() }}
                        onClick={() => { this.confirmValue(i) }}>
                        <v-icon
                            pack={this.iconPack}
                            icon={this.icon}
                            size={this.size}
                        ></v-icon>
                        {this.checkHalf(i) && (
                            <v-icon
                                class="is-half"
                                pack={this.iconPack}
                                icon={this.icon}
                                size={this.size}
                                style={this.halfStyle}
                            ></v-icon>
                        )}
                    </div>
                )
            }

            return rates
        }

        return (
            <div class={['rate', { 'is-disabled': this.disabled, 'is-spaced': this.spaced, 'is-rtl': this.rtl }]}>
                {generateItem(this.max)}
                {isShow && (
                    <div class={['rate-text', this.size]}>
                        <span>{this.showMe}</span>
                        {this.customText && !this.showText && (
                            <span>{this.customText}</span>
                        )}
                    </div>
                )}
            </div>
        )
    }
}