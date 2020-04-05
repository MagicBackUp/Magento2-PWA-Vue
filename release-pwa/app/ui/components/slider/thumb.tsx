import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import VTooltip from '../tooltip/tooltip'

@Component({
    name: 'v-slider-thumb',
    inheritAttrs: false,
    components: {
        VTooltip
    }
})
export default class VSliderThumb extends Vue {
    @Prop({ default: 0 }) readonly value: number | any
    @Prop({ default: '' }) readonly type: string | undefined
    @Prop({ default: true }) readonly tooltip: boolean | undefined
    @Prop(Function) readonly customFormatter: Function | undefined

    public isFocused: boolean = false
    public dragging: boolean = false
    public startX: number = 0
    public startPosition: number = 0
    public newPosition: any = null
    public oldValue: number = this.value

    private get disabled () {
        return this.$parent.disabled
    }

    private get max () {
        return this.$parent.max
    } 
    private get min () {
        return this.$parent.min
    }

    private get step () {
        return this.$parent.step
    }

    private get precision () {
        return this.$parent.precision
    }

    private get currentPosition () {
        return `${(this.value - this.min) / (this.max - this.min) * 100}%`
    }

    private get wrapperStyle () {
        return { left: this.currentPosition }
    }

    private get tooltipLabel () {
        return typeof this.customFormatter !== 'undefined'
            ? this.customFormatter(this.value)
            : this.value.toString()
    }

    public onFocus() {
        this.isFocused = true
    }

    public onBlur () {
        this.isFocused = false
    }

    public onButtonDown (event: any) {
        if (this.disabled) return false
        event.preventDefault()
        this.onDragStart(event)

        if (typeof window !== 'undefined') {
            document.addEventListener('mousemove', this.onDragging)
            document.addEventListener('touchmove', this.onDragging)
            document.addEventListener('mouseup', this.onDragEnd)
            document.addEventListener('touchend', this.onDragEnd)
            document.addEventListener('contextmenu', this.onDragEnd)
        }
    }

    public onLeftKeyDown () {
        if (this.disabled || this.value === this.min) return false
        this.newPosition = parseFloat(this.currentPosition) -
            this.step / (this.max - this.min) * 100
        this.setPosition(this.newPosition)
        this.$parent.emitValue('change')
    }

    public onRightKeyDown () {
        if (this.disabled || this.value === this.max) return false
        this.newPosition = parseFloat(this.currentPosition) +
            this.step / (this.max - this.min) * 100
        this.setPosition(this.newPosition)
        this.$parent.emitValue('change')
    }

    public onHomeKeyDown () {
        if (this.disabled || this.value === this.min) return false
        this.newPosition = 0
        this.setPosition(this.newPosition)
        this.$parent.emitValue('change')
    }

    public onEndKeyDown () {
        if (this.disabled || this.value === this.max) return false
        this.newPosition = 100
        this.setPosition(this.newPosition)
        this.$parent.emitValue('change')
    }

    public onkeyDown (e: any) {
        console.log(e.keyCode)
        if (e.keyCode === 13) {

        }
    }

    public onDragStart (event: any) {
        this.dragging = true
        this.$emit('dragstart')
        if (event.type === 'touchstart') {
            event.clientX = event.touches[0].clientX
        }
        this.startX = event.clientX
        this.startPosition = parseFloat(this.currentPosition)
        this.newPosition = this.startPosition
    }

    public onDragging (event: any) {
        if (this.dragging) {
            if (event.type === 'touchmove') {
                event.clientX = event.touches[0].clientX
            }
            const diff: any = (event.clientX - this.startX) / this.$parent.sliderSize() * 100
            this.newPosition = this.startPosition + diff
            this.setPosition(this.newPosition)
        }
    }

    public onDragEnd () {
        this.dragging = false
        this.$emit('dragend')
        if (this.value !== this.oldValue) {
            this.$parent.emitValue('change')
        }
        this.setPosition(this.newPosition)
        if (typeof window !== 'undefined') {
            document.removeEventListener('mousemove', this.onDragging)
            document.removeEventListener('touchmove', this.onDragging)
            document.removeEventListener('mouseup', this.onDragEnd)
            document.removeEventListener('touchend', this.onDragEnd)
            document.removeEventListener('contextmenu', this.onDragEnd)
        }
    }

    public setPosition (percent: any) {
        if (percent === null || isNaN(percent)) return
        if (percent < 0) {
            percent = 0
        } else if (percent > 100) {
            percent = 100
        }
        const stepLength: number = 100 / ((this.max - this.min) / this.step)
        const steps: number = Math.round(percent / stepLength)
        let value: number = steps * stepLength / 100 * (this.max - this.min) + this.min
        value = parseFloat(value.toFixed(this.precision))
        this.$emit('input', value)
        if (!this.dragging && value !== this.oldValue) {
            this.oldValue = value
        }
    }

    protected render (h: CreateElement) {
        return (
            <div
                class={['v-slider-thumb-wrapper', {'is-dragging': this.dragging}]}
                style={this.wrapperStyle}>
                <v-tooltip
                    label={this.tooltipLabel}
                    type={this.type}
                    always={this.dragging || this.isFocused}
                    active={!this.disabled && this.tooltip}>
                    <div
                        class="v-slider-thumb"
                        tabindex={this.disabled ? false : 0}
                        {...{attrs: this.$attrs}}
                        onMousedown={(e: Event) => { this.onButtonDown(e) }}
                        onTouchstart={(e: Event) => { this.onButtonDown(e) }}
                        onFocus={() => { this.onFocus() }}
                        onBlur={() => { this.onBlur() }}
                        // @keydown.left.prevent="onLeftKeyDown"
                        // @keydown.right.prevent="onRightKeyDown"
                        // @keydown.down.prevent="onLeftKeyDown"
                        // @keydown.up.prevent="onRightKeyDown"
                        // @keydown.home.prevent="onHomeKeyDown"
                        // @keydown.end.prevent="onEndKeyDown"
                        onKeydown={(e: Event) => { this.onkeyDown(e) }}></div>
                </v-tooltip>
            </div>
        )
    }
}