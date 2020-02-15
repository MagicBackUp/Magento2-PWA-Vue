import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { config, VElementMixins } from '../../utils'
import VIcon from '../icon/icon'

@Component({
    name: 'v-input',
    components: {
        VIcon
    },
    mixins: [VElementMixins],
    inheritAttrs: false
})
export default class VInput extends Vue {
    @Prop([Number, String]) readonly value: number | string | any
    @Prop({ default: 'text' }) readonly type: string | any
    @Prop(Boolean) readonly passwordReveal: boolean | undefined
    @Prop(Boolean) readonly iconClickable: boolean | undefined
    @Prop([Number, String]) maxlength: number | string | any
    @Prop({ default: config.defaultInputHasCounter }) readonly hasCounter: boolean | any
    @Prop(String) readonly validationMessage: string | undefined
    @Prop({ default: '' }) readonly customClass: string | undefined
    @Prop(String) readonly iconRight: string | undefined
    @Prop(Boolean) readonly iconRightClickable: boolean | undefined

    public newValue: number | string = this.value
    public newType: string = this.type
    public newAutocomplete: string = this.autocomplete || config.defaultInputAutocomplete
    public isPasswordVisible: boolean = false
    public _elementRef: string = this.type === 'textarea' ? 'textarea' : 'input'

    private get computedValue () {
        return this.newValue
    }

    private set computedValue (value: string | number) {
        this.newValue = value
        this.$emit('input', value)
        !this.isValid && this.checkHtml5Validity()
    }

    private get rootClasses () {
        return [
            this.iconPosition,
            this.size,
            {
                'is-expanded': this.expanded,
                'is-loading': this.loading,
                'is-clearfix': !this.hasMessage
            }
        ]
    }

    private get inputClasses () {
        return [
            this.statusType,
            this.size,
            { 'is-rounded': this.rounded }
        ]
    }

    private get hasIconRight () {
        return this.passwordReveal || this.loading || this.statusTypeIcon || this.iconRight
    }

    private get rightIcon () {
        if (this.passwordReveal) {
            return this.passwordVisibleIcon
        } else if (this.statusTypeIcon) {
            return this.statusTypeIcon
        }

        return this.iconRight
    }

    private get rightIconType () {
        if (this.passwordReveal) {
            return 'is-primary'
        } else if (this.statusTypeIcon) {
            return this.statusType
        }
        return null
    }

    private get iconPosition () {
        if (this.icon && this.hasIconRight) {
            return 'has-icons-left has-icons-right'
        } else if (!this.icon && this.hasIconRight) {
            return 'has-icons-right'
        } else if (this.icon) {
            return 'has-icons-left'
        }
    }

    private get statusTypeIcon() {
        switch (this.statusType) {
            case 'is-success': return 'check'
            case 'is-danger': return 'alert-circle'
            case 'is-info': return 'information'
            case 'is-warning': return 'alert'
        }
    }

    private get hasMessage () {
        return !!this.statusMessage
    }
  
    private get passwordVisibleIcon() {
        return !this.isPasswordVisible ? 'eye' : 'eye-off'
    }

    private get valueLength () {
        if (typeof this.computedValue === 'string') {
            return this.computedValue.length
        } else if (typeof this.computedValue === 'number') {
            return this.computedValue.toString().length
        }
        return 0
    }

    public togglePasswordVisibility () {
        this.isPasswordVisible = !this.isPasswordVisible
        this.newType = this.isPasswordVisible ? 'text' : 'password'

        this.$nextTick(() => {
            const input: any = this.$refs.input
            input && input.focus()
        })
    }

    public onInput (event: Event) {
        this.$nextTick(() => {
            if (event.target) {
                const target: any = event.target
                this.computedValue = target.value
            }
        })
    }

    public iconClick (emit: string, event: Event) {
        this.$emit(emit, event)
        this.$nextTick(() => {
            const input: any = this.$refs.input
            input && input.focus()
        })
    }

    public rightIconClick (event: Event) {
        if (this.passwordReveal) {
            this.togglePasswordVisibility()
        } else if (this.iconRightClickable) {
            this.iconClick('icon-right-click', event)
        }
    }

    protected render (h: CreateElement) {
        return (
            <div class={['control', this.rootClasses]}>
                {this.type !== 'textarea' ? (
                    <input
                        ref="input"
                        class={['input', this.inputClasses, this.customClass]}
                        type={this.newType}
                        autocomplete={this.newAutocomplete}
                        maxlength={this.maxlength}
                        value={this.computedValue}
                        {...{attrs: this.$attrs}}
                        onInput={(e: Event) => { this.onInput(e) }}
                        onBlur={() => { this.onBlur() }}
                        onFocus={() => { this.onFocus() }} />
                ) : (
                    <textarea
                        ref="textarea"
                        class={['textarea', this.inputClasses, this.customClass]}
                        maxlength={this.maxlength}
                        value={this.computedValue}
                       {...{attrs: this.$attrs}}
                        onInput={(e: Event) => { this.onInput(e) }}
                        onBlur={() => { this.onBlur() }}
                        onFocus={() => { this.onFocus() }}
                    ></textarea>
                )}
                {this.icon && (
                    <v-icon
                        class={['is-left', 'is-clickable' && this.iconClickable]}
                        icon={this.icon}
                        pack={this.iconPack}
                        size={this.iconSize}
                        onClick={(e: Event) => { this.iconClick('icon-click', e) }} />
                )}
                {!this.loading && this.hasIconRight && (
                    <v-icon
                        class={['is-right', 'is-clickable' && this.passwordReveal || this.iconRightClickable]}
                        icon={this.rightIcon}
                        pack={this.iconPack}
                        size={this.iconSize}
                        type={this.rightIconType}
                        both={true}
                        onClick={(e: Event) => { this.rightIconClick(e) }} />
                )}
                {this.maxlength && this.hasCounter && this.type !== 'number' && (
                    <small class={['help counter', 'is-invisible' && !this.isFocused]}>{this.valueLength / this.maxlength}</small>
                )}
            </div>
        )
    }
}