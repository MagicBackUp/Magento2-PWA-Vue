import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { config } from '../../utils'
import VIcon from '../icon/icon'

@Component({
    name: 'v-steps',
    inheritAttrs: false,
    components: {
        VIcon
    }
})
export default class VSteps extends Vue {
    @Prop(Number) readonly value: number | undefined
    @Prop([String, Object]) readonly type: string | object | undefined
    @Prop({ default: true }) readonly animated: boolean | undefined
    @Prop({ default: false }) readonly destroyOnHide: boolean | undefined
    @Prop(String) readonly iconPack: string | undefined
    @Prop({ default: config.defaultIconPrev }) readonly iconPrev: string | undefined
    @Prop({ default: config.defaultIconNext }) readonly iconNext: string | undefined
    @Prop({ default: true }) readonly hasNavigation: boolean | undefined
    @Prop({ default: false }) readonly vertical: boolean | undefined
    @Prop(String) readonly position: string | any
    @Prop({ default: 'bottom' }) readonly labelPosition: 'bottom' | 'right' | 'left' | any
    @Prop({ default: true }) readonly rounded: boolean | undefined
    @Prop(Number) readonly ariaNextLabel: number | undefined
    @Prop(Number) readonly ariaPreviousLabel: number | undefined

    @Watch('value')
    onValueChanged (value: number) {
        this.changeStep(value)
    }
    @Watch('stepItems')
    onStepItemsChanged () {
        if (this.activeStep < this.stepItems.length) {
            let previous = this.activeStep
            this.stepItems.map((step, idx) => {
                if (step.isActive) {
                    previous = idx
                    if (previous < this.stepItems.length) {
                        this.stepItems[previous].deactivate(this.activeStep, previous)
                    }
                }
            })
            this.stepItems[this.activeStep].activate(this.activeStep, previous)
        } else if (this.activeStep > 0) {
            this.changeStep(this.activeStep - 1)
        }
    }

    public activeStep: number = this.value || 0
    public defaultSlots: any[] = []
    public contentHeight: number = 0
    public isTransitioning: boolean = false
    public _isSteps: boolean = true

    private get wrapperClasses () {
        return [
            this.size,
            {
                'is-vertical': this.vertical,
                [this.position]: this.position && this.vertical
            }
        ]
    }
    
    private get mainClasses () {
        return [
            this.type,
            {
                'has-label-right': this.labelPosition === 'right',
                'has-label-left': this.labelPosition === 'left',
                'is-animated': this.animated,
                'is-rounded': this.rounded
            }
        ]
    }

    private get stepItems () {
        return this.defaultSlots
            .filter((vnode) =>
                vnode.componentInstance &&
                vnode.componentInstance.$data &&
                vnode.componentInstance.$data._isStepItem)
            .map((vnode) => vnode.componentInstance)
    }

    private get reversedStepItems () {
        return this.stepItems.slice().reverse()
    }

    private get firstVisibleStepIndex () {
        return this.stepItems.map(
            (step, idx) => step.visible
        ).indexOf(true)
    }

    private get hasPrev () {
        return this.firstVisibleStepIndex >= 0 &&
            this.activeStep > this.firstVisibleStepIndex
    }

    private get lastVisibleStepIndex () {
        let idx = this.reversedStepItems.map(
            (step, idx) => step.visible
        ).indexOf(true)
        if (idx >= 0) {
            return this.stepItems.length - 1 - idx
        }
        return idx
    }

    private get hasNext () {
        return this.lastVisibleStepIndex >= 0 &&
            this.activeStep < this.lastVisibleStepIndex
    }

    private get navigationProps () {
        return {
            previous: {
                disabled: !this.hasPrev,
                action: this.prev
            },
            next: {
                disabled: !this.hasNext,
                action: this.next
            }
        }
    }

    private mounted() {
        if (this.activeStep < this.stepItems.length) {
            this.stepItems[this.activeStep].isActive = true
        }

        this.refreshSlots()
    }

    public refreshSlots () {
        this.defaultSlots = this.$slots.default || []
    }

    public changeStep (newIndex: number) {
        if (this.activeStep === newIndex) return false
        if (newIndex > this.stepItems.length) throw new Error('The index you trying to set is bigger than the steps length')
        if (this.activeStep < this.stepItems.length) {
            this.stepItems[this.activeStep].deactivate(this.activeStep, newIndex)
        }
        this.stepItems[newIndex].activate(this.activeStep, newIndex)
        this.activeStep = newIndex
        this.$emit('change', newIndex)
    }

    public isItemClickable (stepItem: any, index: number) {
        if (stepItem.clickable === undefined) {
            return this.activeStep > index
        }
        return stepItem.clickable
    }

    public stepClick (value: any) {
        this.$emit('input', value)
        this.changeStep(value)
    }

    public prev() {
        if (!this.hasPrev) return false
        let prevItemIdx: number = this.reversedStepItems.map(
            (step, idx) => this.stepItems.length - 1 - idx < this.activeStep && step.visible
        ).indexOf(true)

        if (prevItemIdx >= 0) {
            prevItemIdx = this.stepItems.length - 1 - prevItemIdx
        }
        this.$emit('input', prevItemIdx)
        this.changeStep(prevItemIdx)
    }

    public next () {
        if (!this.hasNext) return false
        const nextItemIdx: number = this.stepItems.map(
            (step, idx) => idx > this.activeStep && step.visible
        ).indexOf(true)

        this.$emit('input', nextItemIdx)
        this.changeStep(nextItemIdx)
    }

    protected render (h: CreateElement) {
        return (
            <div class={['b-steps', this.wrapperClasses]}>
                <nav class={['steps', this.mainClasses]}>
                    <ul class="step-items">
                        {this.stepItems.map((stepItem: any, index: number) => {
                            return (
                                stepItem.visible && (
                                    <li
                                        key={index}
                                        class={['step-item', stepItem.type || this.type, {
                                            'is-active': this.activeStep === index,
                                            'is-previous': this.activeStep > index
                                        }]}>
                                        <a
                                            class={['step-link', {'is-clickable': this.isItemClickable(stepItem, index)}]}
                                            onClick={() => { this.isItemClickable(stepItem, index) && this.stepClick(index) }}>
                                            <div class="step-marker">
                                                {stepItem.icon && (
                                                    <v-icon
                                                        icon={stepItem.icon}
                                                        pack={stepItem.iconPack}
                                                        size={this.size}></v-icon>
                                                )}
                                                {stepItem.step && (
                                                    <span>{stepItem.step}</span>
                                                )}
                                            </div>
                                            <div class="step-details">
                                                <span class="step-title">{stepItem.label}</span>
                                            </div>
                                        </a>
                                    </li>
                                )
                            )
                        })}
                    </ul>
                </nav>
                <section class={['step-content', {'is-transitioning': this.isTransitioning}]}>
                    {this.$slots.default}
                </section>
                <slot
                    name="navigation"
                    previous={this.navigationProps.previous}
                    next={this.navigationProps.next}>
                    {this.hasNavigation && (
                        <nav class="step-navigation">
                            <a
                                role="button"
                                class="pagination-previous"
                                disabled={this.navigationProps.previous.disabled}
                                onClick={() => { this.navigationProps.previous.action() }}
                                aria-label={this.ariaPreviousLabel}>
                                <v-icon
                                    icon={this.iconPrev}
                                    pack={this.iconPack}
                                    both
                                    aria-hidden="true"></v-icon>
                            </a>
                            <a
                                role="button"
                                class="pagination-next"
                                disabled={this.navigationProps.next.disabled}
                                onClick={() => { this.navigationProps.next.action() }}
                                aria-label={this.ariaNextLabel}>
                                <v-icon
                                    icon={this.iconNext}
                                    pack={this.iconPack}
                                    both
                                    aria-hidden="true"></v-icon>
                            </a>
                    </nav>
                    )}
                </slot>
            </div>
        )
    }
}