import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { VRadioMixins } from '../../utils'

@Component({
    name: 'v-radio',
    mixins: [VRadioMixins],
    inheritAttrs: false
})
export default class VRadio extends Vue {
    public keydown (e: Event) {
        const event: any = e
        const label: any = this.$refs.label

        if (event.keyCode == 13) e.preventDefault()
        label && label.click()
    }

    public click (e: Event) {
        e.stopPropagation()
    }

    protected render (h: CreateElement) {
        return (
            <label
                ref="label"
                class={['b-radio radio', this.size, { 'is-disabled': this.disabled }]}
                disabled={this.disabled}
                onClick={() => { this.focus() }}
                onKeydown={(e: Event) => { this.keydown(e) }}>
                <input
                    type="radio"
                    ref="input"
                    name={this.name}
                    value={this.nativeValue}
                    vModel={this.computedValue}
                    disabled={this.disabled}
                    required={this.required}
                    {...{attrs: this.$attrs}}
                    onClick={(e: Event) => { this.click(e) }} />
                <span class={['check', this.type]}></span>
                <span class="control-label">{this.$slots.default}</span>
            </label>
        )
    }
}