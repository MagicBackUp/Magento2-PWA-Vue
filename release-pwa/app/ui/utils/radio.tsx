import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class VRadioMixins extends Vue {
    @Prop([String, Number, Boolean, Function, Object, Array]) readonly value: string | number | boolean | object | any[] | any
    @Prop([String, Number, Boolean, Function, Object, Array]) readonly nativeValue: string | number | boolean | object | any[] | any
    @Prop(String) readonly type: string | undefined
    @Prop(Boolean) readonly disabled: boolean | undefined
    @Prop(Boolean) readonly required: boolean | undefined
    @Prop(String) readonly name: string | undefined
    @Prop(String) readonly size: string | undefined

    @Watch('value')
    onValueChanged(value: any) {
        this.newValue = value
    }

    public newValue: any = this.value

    private get computedValue () {
        return this.newValue
    }

    private set computedValue (value: any) {
        this.newValue = value
        this.$emit('input', value)
    }

    public focus () {
        const input: any = this.$refs.input
        input && input.focus()
    }
}