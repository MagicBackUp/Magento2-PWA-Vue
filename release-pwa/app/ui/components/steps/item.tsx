import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'v-step-item',
    inheritAttrs: false
})
export default class VStepItem extends Vue {
    @Prop(String) readonly step: string | undefined
    @Prop(String) readonly label: string | undefined
    @Prop([String, Object]) readonly type: string | object | undefined
    @Prop(String) readonly icon: string | undefined
    @Prop(String) readonly iconPack: string | undefined
    @Prop({ default: false }) readonly clickable: boolean | undefined
    @Prop({ default: true }) readonly visible: boolean | undefined

    public isActive: boolean = false
    public transitionName: any = null
    public _isStepItem: boolean = true

    private created () {
        if (!this.$parent.$data._isSteps) {
            this.$destroy()
            throw new Error(`You should wrap VStepItem on a VSteps`)
        }
        this.$parent.refreshSlots()
    }

    private beforeDestroy () {
        this.$parent.refreshSlots()
    }

    public activate (oldIndex: number, index: number) {
        this.transitionName = index < oldIndex
            ? this.$parent.vertical ? 'slide-down' : 'slide-next'
            : this.$parent.vertical ? 'slide-up' : 'slide-prev'
        this.isActive = true
    }

    public deactivate (oldIndex: number, index: number) {
        this.transitionName = index < oldIndex
            ? this.$parent.vertical ? 'slide-down' : 'slide-next'
            : this.$parent.vertical ? 'slide-up' : 'slide-prev'
        this.isActive = false
    }

    protected render (h: CreateElement) {
        const directives: any = [
            { name: 'show', value: this.isActive && this.visible }
        ]

        if (this.$parent.destroyOnHide) {
            if (!this.isActive || !this.visible) {
                return false
            }
        }

        return (
            this.$parent.animated ? (
                <transition 
                    name={this.transitionName}
                    before-enter={() => { this.$parent.isTransitioning = true }}
                    after-enter={() => { this.$parent.isTransitioning = false }}>
                    <div class="step-item" {...{ directives }}>
                        {this.$slots.default}
                    </div>       
                </transition>
            ) : (
                <div class="step-item" {...{ directives }}>
                    {this.$slots.default}
                </div>
            )
        )
    }
}