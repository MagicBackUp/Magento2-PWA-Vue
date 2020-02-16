import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { VRadioMixins } from '../../utils'

@Component({
    name: 'v-checkbox',
    mixins: [VRadioMixins],
    inheritAttrs: false
})
export default class VCheckbox extends Vue {
    @Prop(Boolean) readonly indeterminate: boolean | undefined
    @Prop({ default: true }) readonly trueValue: string | number | boolean | object | any[] | any
    @Prop({ default: false }) readonly falseValue: string | number | boolean | object | any[] | any

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
                class={['b-checkbox checkbox', this.size, { 'is-disabled': this.disabled }]}
                ref="label"
                disabled={this.disabled}
                onClick={() => { this.focus() }}
                onKeydown={(e: Event) => { this.keydown(e) }}>
                <input
                    type="checkbox"
                    ref="input"
                    name={this.name}
                    value={this.nativeValue}
                    vModel={this.computedValue}
                    disabled={this.disabled}
                    required={this.required}
                    true-value={this.trueValue}
                    false-value={this.falseValue}
                    indeterminate={this.indeterminate}
                    {...{attrs: this.$attrs}}
                    onClick={(e: Event) => { this.click(e) }} />
                <span class={['check', this.type]}></span>
                <span class="control-label">{this.$slots.default}</span>
            </label>
        )
    }
}