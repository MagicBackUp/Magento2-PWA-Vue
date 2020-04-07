import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { VElementMixins } from '../../utils'
import VIcon from '../icon/icon'
import VInput from '../input/input'

@Component({
    name: 'v-number',
    inheritAttrs: false,
    mixins: [VElementMixins],
    components: {
        VIcon,
        VInput
    }
})
export default class VNumber extends Vue {
    @Prop([Number, String]) readonly value: number | string | any
    @Prop([Number, String]) readonly min: number | string | any
    @Prop([Number, String]) readonly max: number | string | any
    @Prop([Number, String]) readonly step: number | string | any
    @Prop(Boolean) readonly disabled: boolean | undefined
    @Prop({ default: 'is-primary' }) readonly type: string | undefined
    @Prop({ default: true }) readonly editable: boolean | any
    @Prop({ default: true }) readonly controls: boolean | any
    @Prop({ default: false }) readonly controlsRounded: boolean | any
    @Prop(String) readonly controlsPosition: string | undefined

    @Watch('value') 
    onValueChanged (value: any) {
        this.newValue = Number(value)
    }

    public newValue: number = !isNaN(this.value) ? this.value : parseFloat(this.min) || 0
    public newStep: number = this.step || 1
    public _elementRef: string = 'input'

    private get computedValue () {
        return this.newValue
    }
    
    private set computedValue (value: any) {
        let newValue: any = value
        let input: any = this.$refs.input

        if (value === '') {
            newValue = parseFloat(this.min) || null
        }

        this.newValue = newValue
        this.$emit('input', newValue)
        !this.isValid && input.checkHtml5Validity()
    }

    private get fieldClasses () {
        return [
            { 'has-addons': this.controlsPosition === 'compact' },
            { 'is-grouped': this.controlsPosition !== 'compact' },
            { 'is-expanded': this.expanded }
        ]
    }

    private get buttonClasses () {
        return [
            this.type,
            this.size,
            { 'is-rounded': this.controlsRounded }
        ]
    }

    private get minNumber () {
        return typeof this.min === 'string'
            ? parseFloat(this.min) : this.min
    }

    private get maxNumber () {
        return typeof this.max === 'string'
            ? parseFloat(this.max) : this.max
    }

    private get stepNumber () {
        return typeof this.newStep === 'string'
            ? parseFloat(this.newStep) : this.newStep
    }

    private get disabledMin () {
        return (this.computedValue - this.stepNumber) < this.minNumber
    }

    private get disabledMax () {
        return (this.computedValue + this.stepNumber) > this.maxNumber
    }

    private get stepDecimals () {
        const step: string = this.stepNumber.toString()
        const index: number = step.indexOf('.')
        if (index >= 0) {
            return step.substring(index + 1).length
        }
        return 0
    }

    public decrement() {
        if (typeof this.minNumber === 'undefined' ||
        (this.computedValue - this.stepNumber) >= this.minNumber) {
            const value = this.computedValue - this.stepNumber
            this.computedValue = parseFloat(value.toFixed(this.stepDecimals))
        }
    }

    public increment () {
        if (typeof this.maxNumber === 'undefined' ||
        (this.computedValue + this.stepNumber) <= this.maxNumber) {
            const value = this.computedValue + this.stepNumber
            this.computedValue = parseFloat(value.toFixed(this.stepDecimals))
        }
    }

    public onControlClick(event: any, inc: any) {
        // IE 11 -> filter click event
        if (event.detail !== 0 || event.type === 'click') return false
        if (inc) this.increment()
        else this.decrement()
    }

    public onStartLongPress(event: any, inc: any) {
        if (event.button !== 0 && event.type !== 'touchstart') return false
        this._$intervalTime = new Date()
        clearInterval(this._$intervalRef)
        this._$intervalRef = setInterval(() => {
            if (inc) this.increment()
            else this.decrement()
        }, 250)
    }

    public onStopLongPress (inc: any) {
        if (!this._$intervalRef) return false
        const d: any = new Date()
        if (d - this._$intervalTime < 250) {
            if (inc) this.increment()
            else this.decrement()
        }
        clearInterval(this._$intervalRef)
        this._$intervalRef = null
    }

    public emitEvent (name: string, e: Event) {
        this.$emit(name, e)
    }

    protected render (h: CreateElement) {
        return (
            <div class={['b-numberinput field', this.fieldClasses]}>
                {this.controls && (
                    <p
                        class="control"
                        onMouseup={() => { this.onStopLongPress(false) }}
                        onMouseleave={() => { this.onStopLongPress(false) }}
                        onTouchend={() => { this.onStopLongPress(false) }}
                        onTouchcancel={() => { this.onStopLongPress(false) }}>
                        <button
                            type="button"
                            class={['button', this.buttonClasses]}
                            disabled={this.disabled || this.disabledMin}
                            onMousedown={(e: Event) => { this.onStartLongPress(e, false) }}
                            onTouchstart={(e: Event) => { e.preventDefault && this.onStartLongPress(e, false) }}
                            onClick={(e: Event) => { this.onControlClick(e, false) }}>
                            <v-icon
                                icon="minus"
                                both
                                pack={this.iconPack}
                                size={this.iconSize}></v-icon>
                        </button>
                    </p>
                )}
                <v-input
                    type="number"
                    ref="input"
                    vModel={this.computedValue}
                    {...{attrs: this.$attrs}}
                    step={this.newStep}
                    max={this.max}
                    min={this.min}
                    size={this.size}
                    disabled={this.disabled}
                    readonly={!this.editable}
                    loading={this.loading}
                    rounded={this.rounded}
                    icon={this.icon}
                    icon-pack={this.iconPack}
                    autocomplete={this.autocomplete}
                    expanded={this.expanded}
                    use-html5-validation={this.useHtml5Validation}
                    onFocus={(e: Event) => this.emitEvent('focus', e) }
                    onBlur={(e: Event) => this.emitEvent('blur', e) }></v-input>
                {this.controls && (
                    <p
                        class="control"
                        onMouseup={() => { this.onStopLongPress(true) }}
                        onMouseleave={() => { this.onStopLongPress(true) }}
                        onTouchend={() => { this.onStopLongPress(true) }}
                        onTouchcancel={() => { this.onStopLongPress(true) }}>
                        <button
                            type="button"
                            class={['button', this.buttonClasses]}
                            disabled={this.disabled || this.disabledMax}
                            onMousedown={(e: Event) => { this.onStartLongPress(e, true) }}
                            onTouchstart={(e: Event) => { e.preventDefault && this.onStartLongPress(e, true) }}
                            onClick={(e: Event) => { this.onControlClick(e, true) }}>
                            <v-icon
                                icon="plus"
                                both
                                pack={this.iconPack}
                                size={this.iconSize}></v-icon>
                        </button>
                    </p>
                )}
            </div>
        )
    }
}