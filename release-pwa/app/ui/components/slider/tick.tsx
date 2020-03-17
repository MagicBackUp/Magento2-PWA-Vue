import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'v-slider-tick'
})
export default class VSliderTick extends Vue {
    @Prop({ default: 0 }) readonly value: number | any

    private get position () {
        const pos: number = (this.value - this.$parent.min) / (this.$parent.max - this.$parent.min) * 100
        return (pos >= 0 && pos <= 100) ? pos : 0
    }

    private get hidden () {
        return this.value === this.$parent.min || this.value === this.$parent.max
    }

    public created () {
        if (!this.$parent.$data._isSlider) {
            this.$destroy()
            throw new Error(`You should wrap v-slider-tick on a v-slider ...`)
        }
    }

    public getTickStyle (position: number) {
        return { 'left': position + '%' }
    }
    
    protected render (h: CreateElement) {
        return (
            <div
                class={['b-slider-tick', { 'is-tick-hidden': this.hidden }]}
                style={this.getTickStyle(this.position)}>
                {this.$slots.default && (
                    <span class="b-slider-tick-label">
                        {this.$slots.default}
                    </span>
                )}
            </div>
        )
    }
}