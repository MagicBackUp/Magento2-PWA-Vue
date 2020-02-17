import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'v-progress'
})
export default class VProgress extends Vue {
    @Prop({ default: 'is-darkgrey' }) readonly type: string | object | undefined
    @Prop(String) readonly size: string | undefined
    @Prop({ default: undefined }) readonly value: number | undefined
    @Prop({ default: 100 }) readonly max: number | any
    @Prop({ default: false }) readonly showValue: boolean | undefined
    @Prop({ default: 'raw' }) readonly format: 'raw' | 'percent' | undefined
    @Prop({ default: 2 }) readonly precision: number | any
    @Prop({ default: false }) readonly keepTrailingZeroes: boolean | undefined

    @Watch('value')
    onValueChanged (value: number) {
        this.setValue(value)
    }

    private get isIndeterminate () {
        return this.value === undefined || this.value === null
    }

    private get newType () {
        return [
            this.size,
            this.type
        ]
    }

    private get newValue () {
        if (this.value === undefined || this.value === null || isNaN(this.value)) {
            return undefined
        }
        if (this.format === 'percent') {
            const val = this.toFixed(this.value * 100 / this.max)
            return `${val}%`
        }
        const val = this.toFixed(this.value)
        return val
    }

    public mounted () {
        this.setValue(this.value)
    }

    public setValue (value: any) {
        const progress: any = this.$refs.progress
        if (this.isIndeterminate) {
            progress && progress.removeAttribute('value')
        } else {
            progress && progress.setAttribute('value', value)
        }
    }

    public toFixed (num: number) {
        let fixed = (+(`${Math.round(+(`${num}e${this.precision}`))}e${-this.precision}`)).toFixed(this.precision)
        if (!this.keepTrailingZeroes) {
            fixed = fixed.replace(/\.?0+$/, '')
        }
        return fixed
    }

    protected render (h: CreateElement) {
        return (
            <div class="progress-wrapper">
                <progress
                    ref="progress"
                    class={['progress', this.newType]}
                    max={this.max}>{this.newValue}</progress>
                {this.showValue && (
                    <p class="progress-value">{this.$slots.default ? this.$slots.default : this.newValue}</p>
                )}
            </div>
        )
    }
}