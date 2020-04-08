import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'v-ios-alert-view'
})
export default class VIosAlertView extends Vue {
    @Prop(String) title: string | any
    @Prop(String) text: string | undefined
    @Prop(Boolean) input: boolean | undefined
    @Prop(String) placeholder: string | undefined
    @Prop({ default: () => {} }) onClick: Function | undefined
    @Prop(Number) remindDuration: number | any
    @Prop(Array) buttons: any[] | undefined

    public showModal: boolean = false
    public value: string = ''
    public _deferred: any = null
    public ANIMATION_TIME: number = 400
    
    public defer () {
        let promise: Promise<any>,
            resolve: any,
            reject: any
      
        promise = new Promise((_resolve_: any, _reject_: any) => {
            resolve = _resolve_
            reject = _reject_
        })
      
        return {
            promise: promise,
            resolve: resolve,
            reject: reject
        }
    }

    public activate () {
        this._deferred = this.defer()
        this.showModal = true

        if(!this.buttons || !this.buttons.length){
            setTimeout(() => {
                this.showModal = false
                this._deferred.resolve()
            }, this.ANIMATION_TIME + this.remindDuration)
        }

        return this._deferred.promise
    }

    public clickButton (button: any, index: number, e: Event) {
        e.preventDefault()
        e.stopPropagation()
        
        const cbkData: any = {
            index: index,
            button: button,
            value: this.value
        }

        if (typeof button.onClick === 'function') {
            button.onClick(cbkData)
        }

        this._deferred.resolve(cbkData)
        this.showModal = false
    }

    public afterLeave () {
        const el: any = this.$el
        this.$destroy()
        el.parentNode.removeChild(el)
    }

    protected render (h: CreateElement) {
        return (
            <transition after-leave={this.afterLeave}>
                {this.showModal && (
                    <div class="ios-alert-overlay">
                        <div class="ios-alert">
                            <div class={['ios-alert-inner', {'ios-alert-inner-remind': !this.buttons || !this.buttons.length}]}>
                                {this.title && (
                                    <div class="ios-alert-title">{this.title}</div>
                                )}
                                {this.text && (
                                    <div class="ios-alert-text" domPropsInnerHTML={this.text}></div>
                                )}
                                {this.input && (
                                    <input autofocus class="ios-alert-text-input" placeholder={this.placeholder} vModel={this.value} />
                                )}
                            </div>
                            {this.buttons && this.buttons.length && (
                                <div class={['ios-alert-buttons', {'ios-alert-buttons-horizontal': this.buttons.length <= 2}]}>
                                    {this.buttons.map((button: any, index: number) => {
                                        return (
                                            <span class={['ios-alert-button', {'ios-alert-button-bold': button.bold}]} onClick={(e: Event) => { this.clickButton(button, index, e) }}>{button.text}</span>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </transition>
        )
    }
}