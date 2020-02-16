import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import config from './config'

@Component
export default class VElementMixins extends Vue {
    @Prop(String) readonly size: string | undefined
    @Prop(Boolean) readonly expanded: boolean | undefined
    @Prop(Boolean) readonly loading: boolean | undefined
    @Prop(Boolean) readonly rounded: boolean | undefined
    @Prop(String) readonly icon: string | undefined
    @Prop(String) readonly iconPack: string | undefined
    @Prop(String) readonly autocomplete: string | undefined
    @Prop([Number, String]) readonly name: number | string | any
    @Prop({ default: config.defaultUseHtml5Validation }) readonly useHtml5Validation: boolean | any
    @Prop(String) readonly validationMessage: string | undefined

    public isValid: boolean = true
    public isFocused: boolean = false
    public newIconPack: string = this.iconPack || config.defaultIconPack

    private get parentField () {
        let parent = this.$parent

        for (let i = 0; i < 3; i++) {
            if (parent && !parent.$data._isField) {
                parent = parent.$parent
            }
        }

        return parent
    }

    private get statusType () {
        if (!this.parentField) return
        if (!this.parentField.newType) return
        if (typeof this.parentField.newType === 'string') {
            return this.parentField.newType
        } else {
            for (let key in this.parentField.newType) {
                if (this.parentField.newType[key]) {
                    return key
                }
            }
        }
    }
 
    private get statusMessage () {
        if (!this.parentField) return

        return this.parentField.newMessage
    }

    private get iconSize () {
        switch (this.size) {
            case 'is-small': return this.size
            case 'is-medium': return
            case 'is-large': return this.newIconPack === 'mdi' ? 'is-medium' : ''
        }
    }

    public focus () {
        if (this.$data._elementRef === undefined) return

        this.$nextTick(() => {
            const el: any = this.$el.querySelector(this.$data._elementRef)
            if (el) el.focus()
        })
    }

    public onBlur (e: Event) {
        this.isFocused = false
        this.$emit('blur', e)
        this.checkHtml5Validity()
    }

    public onFocus (e: Event) {
        this.isFocused = true
        this.$emit('focus', e)
    }

    public getElement () {
        return this.$el.querySelector(this.$data._elementRef)
    }

    public setInvalid () {
        let type: string = 'is-danger'
        let message: string = this.validationMessage || this.getElement().validationMessage
        this.setValidity(type, message)
    }

    public setValidity (type: any, message: any) {
        this.$nextTick(() => {
            if (this.parentField) {
                if (!this.parentField.type) {
                    this.parentField.newType = type
                }
    
                if (!this.parentField.message) {
                    this.parentField.newMessage = message
                }
            }
        })
    }

    public checkHtml5Validity () {
        if (!this.useHtml5Validation) return false

        if (this.$refs[this.$data._elementRef] === undefined) return false

        if (!this.getElement().checkValidity()) {
            this.setInvalid()
            this.isValid = false
        } else {
            this.setValidity(null, null)
            this.isValid = true
        }

        return this.isValid
    }
}