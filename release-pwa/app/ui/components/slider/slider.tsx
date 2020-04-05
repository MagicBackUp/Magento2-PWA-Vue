import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import VSliderThumb from './thumb'
import VSliderTick from './tick'

@Component({
    name: 'v-slider',
    components: {
        VSliderThumb,
        VSliderTick
    }
})
export default class VSlider extends Vue {
    @Prop([Number, Array]) readonly value: number | any[] | any
    @Prop(Number) readonly min: number | any
    @Prop(Number) readonly max: number | any
    @Prop({ default: 1 }) readonly step: number | any
    @Prop({ default: 'is-primary' }) readonly size: string | undefined
    @Prop({ default: false }) readonly ticks: boolean | undefined
    @Prop({ default: true }) readonly tooltip: boolean | undefined
    @Prop(String) readonly tooltipType: string | undefined
    @Prop({ default: false }) readonly rounded: boolean | undefined
    @Prop({ default: false }) readonly disabled: boolean | undefined
    @Prop({ default: false }) readonly lazy: boolean | undefined
    @Prop(Function) readonly customFormatter: Function | undefined
    @Prop([String, Array]) readonly ariaLabel: string | any[] | undefined
    @Prop({ default: false }) readonly biggerSliderFocus: boolean | undefined

    @Watch('value')
    onValueChanged (value: any) {
        this.setValues(value)
    }
    @Watch('value1')
    onValue1Changed () {
        this.onInternalValueUpdate()
    }
    @Watch('value2')
    onValue2Changed () {
        this.onInternalValueUpdate()
    }
    @Watch('min')
    onMinChanged() {
        this.setValues(this.value)
    }
    @Watch('max')
    onMaxChanged () {
        this.setValues(this.value)
    }

    public value1: any = null
    public value2: any = null
    public dragging: boolean = false
    public isRange: boolean = false
    public _isSlider: boolean = true

    private get newTooltipType () {
        return this.tooltipType ? this.tooltipType : this.type
    }

    private get tickValues () {
        if (!this.ticks || this.min > this.max || this.step === 0) return []
        const result = []
        for (let i = this.min + this.step; i < this.max; i = i + this.step) {
            result.push(i)
        }
        return result
    }

    private get minValue() {
        return Math.min(this.value1, this.value2)
    }

    private get maxValue () {
        return Math.max(this.value1, this.value2)
    }

    private get barSize () {
        return this.isRange
            ? `${100 * (this.maxValue - this.minValue) / (this.max - this.min)}%`
            : `${100 * (this.value1 - this.min) / (this.max - this.min)}%`
    }

    private get barStart () {
        return this.isRange
            ? `${100 * (this.minValue - this.min) / (this.max - this.min)}%`
            : '0%'
    }

    private get precision () {
        const precisions = [this.min, this.max, this.step].map((item) => {
            let decimal = ('' + item).split('.')[1]
            return decimal ? decimal.length : 0
        })
        return Math.max(...precisions)
    }

    private get barStyle () {
        return {
            width: this.barSize,
            left: this.barStart
        }
    }

    private get rootClasses () {
        return {
            'is-rounded': this.rounded,
            'is-dragging': this.dragging,
            'is-disabled': this.disabled,
            'slider-focus': this.biggerSliderFocus
        }
    }

    private created () {
        this.isThumbReversed = false
        this.isTrackClickDisabled = false
        this.setValues(this.value)
    }

    public setValues (newValue: any) {
        if (this.min > this.max) {
            return
        }
        if (Array.isArray(newValue)) {
            this.isRange = true
            const smallValue = typeof newValue[0] !== 'number' || isNaN(newValue[0])
                ? this.min
                : Math.min(Math.max(this.min, newValue[0]), this.max)
            const largeValue = typeof newValue[1] !== 'number' || isNaN(newValue[1])
                ? this.max
                : Math.max(Math.min(this.max, newValue[1]), this.min)
            this.value1 = this.isThumbReversed ? largeValue : smallValue
            this.value2 = this.isThumbReversed ? smallValue : largeValue
        } else {
            this.isRange = false
            this.value1 = isNaN(newValue)
                ? this.min
                : Math.min(this.max, Math.max(this.min, newValue))
            this.value2 = null
        }
    }

    public onInternalValueUpdate () {
        if (this.isRange) {
            this.isThumbReversed = this.value1 > this.value2
        }
        if (!this.lazy || !this.dragging) {
            this.emitValue('input')
        }
        if (this.dragging) {
            this.emitValue('dragging')
        }
    }

    public sliderSize () {
        const slider: any = this.$refs.slider

        return slider.getBoundingClientRect().width
    }

    public onSliderClick (event: any) {
        if (this.disabled || this.isTrackClickDisabled) return false
        const slider: any = this.$refs.slider
        const button1: any = this.$refs.button1
        const button2: any = this.$refs.button2
        const sliderOffsetLeft: any = slider.getBoundingClientRect().left
        const percent: any = (event.clientX - sliderOffsetLeft) / this.sliderSize() * 100
        const targetValue: any = this.min + percent * (this.max - this.min) / 100
        const diffFirst: any = Math.abs(targetValue - this.value1)

        if (!this.isRange) {
            if (diffFirst < this.step / 2) return false
            button1.setPosition(percent)
        } else {
            const diffSecond = Math.abs(targetValue - this.value2)
            if (diffFirst <= diffSecond) {
                if (diffFirst < this.step / 2) return false
                button1.setPosition(percent)
            } else {
                if (diffSecond < this.step / 2) return false
                button2.setPosition(percent)
            }
        }
        this.emitValue('change')
    }

    public onDragStart () {
        this.dragging = true
        this.$emit('dragstart')
    }

    public onDragEnd () {
        this.isTrackClickDisabled = true
        setTimeout(() => {
            this.isTrackClickDisabled = false
        }, 0)
        this.dragging = false
        this.$emit('dragend')
        if (this.lazy) {
            this.emitValue('input')
        }
    }

    public emitValue (type: string) {
        this.$emit(type, this.isRange ? [this.minValue, this.maxValue] : this.value1)
    }

    protected render (h: CreateElement) {
        return (
            <div
                class={['v-slider', this.size, this.type, this.rootClasses ]}
                onClick={(e: Event) => { this.onSliderClick(e) }}>
                <div class="v-slider-track" ref="slider">
                    <div class="v-slider-fill" style={this.barStyle}></div>
                    {this.ticks && (
                        this.tickValues.map((val: any, key: number) => {
                            return (
                                <v-slider-tick key={key} value={val}></v-slider-tick>
                            )
                        })
                    )}
                    {this.$slots.default}
                    <v-slider-thumb
                        vModel={this.value1}
                        type={this.newTooltipType}
                        tooltip={this.tooltip}
                        custom-formatter={this.customFormatter}
                        ref="button1"
                        role="slider"
                        aria-valuenow={this.value1}
                        aria-valuemin={this.min}
                        aria-valuemax={this.max}
                        aria-orientation="horizontal"
                        aria-label={Array.isArray(this.ariaLabel) ? this.ariaLabel[0] : this.ariaLabel}
                        aria-disabled={this.disabled}
                        onDragstart={() => { this.onDragStart() }}
                        onDragend={() => { this.onDragEnd() }}></v-slider-thumb>
                    {this.isRange && (
                        <v-slider-thumb
                            vModel={this.value2}
                            type={this.newTooltipType}
                            tooltip={this.tooltip}
                            custom-formatter={this.customFormatter}
                            ref="button2"
                            role="slider"
                            aria-valuenow={this.value2}
                            aria-valuemin={this.min}
                            aria-valuemax={this.max}
                            aria-orientation="horizontal"
                            aria-label={Array.isArray(this.ariaLabel) ? this.ariaLabel[1] : ''}
                            aria-disabled={this.disabled}
                            onDragstart={() => { this.onDragStart() }}
                            onDragend={() => { this.onDragEnd() }}></v-slider-thumb>
                    )}
                </div>
            </div>
        )
    }
}