import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'v-switch',
    inheritAttrs: false
})
export default class VSwitch extends Vue {
    @Prop([String, Number, Boolean, Function, Object, Array, Date]) readonly value: string | number | boolean | object | any[] | Date | any
    @Prop([String, Number, Boolean, Function, Object, Array, Date]) readonly nativeValue: string | number | boolean | object | any[] | Date | any
    @Prop(Boolean) readonly disabled: boolean | undefined
    @Prop(String) readonly type: string | undefined
    @Prop(String) readonly name: string | undefined
    @Prop(Boolean) readonly required: boolean | undefined
    @Prop(String) readonly size: string | undefined
    @Prop({ default: true }) readonly trueValue: string | number | boolean | object | any[] | Date | any
    @Prop({ default: false }) readonly falseValue: string | number | boolean | object | any[] | Date | any
    @Prop({ default: true }) readonly rounded: boolean | undefined
    @Prop({ default: false }) readonly outlined: boolean | undefined

    @Watch('value')
    onValueChanged (value: any) {
        this.newValue = value
    }

    private newValue: any = this.value
    private isMouseDown: boolean = false

    private get computedValue () {
            return this.newValue
        }
    
    private set computedValue (value: any) {
        this.newValue = value
        this.$emit('input', value)
    }

    private get newClass () {
        return [
            this.size,
            { 'is-disabled': this.disabled },
            { 'is-rounded': this.rounded },
            { 'is-outlined': this.outlined }
        ]
    }

    public focus () {
        const input: any = this.$refs.input
        input && input.focus()
    }

    public keydown (e: Event) {
        const event: any = e
        const label: any = this.$refs.label

        if (event.keyCode == 13) e.preventDefault()
        label && label.click()
    }
    
    protected render (h: CreateElement) {
        return (
            <label
                class={['switch', this.newClass]}
                ref="label"
                disabled={this.disabled}
                onClick={() => { this.focus() }}
                onKeydown={(e: Event) => { this.keydown(e) }}
                onMousedown={() => { this.isMouseDown = false }}
                onMouseup={() => { this.isMouseDown = false }}
                onMouseout={() => { this.isMouseDown = false }}
                onBlur={() => { this.isMouseDown = false }}>
                <input
                    type="checkbox"
                    ref="input"
                    name={this.name}
                    value={this.nativeValue}
                    vModel={this.computedValue}
                    disabled={this.disabled}
                    required={this.required}
                    {...{attrs: this.$attrs}}
                    true-value={this.trueValue}
                    false-value={this.falseValue}
                    onClick={(e: Event) => { e.stopPropagation() }} />
                <span class={['check', { 'is-elastic': this.isMouseDown && !this.disabled }, this.type]}></span>
                <span class="control-label">{this.$slots.default}</span>
            </label>
        )
    }
}