import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'v-collapse',
    inheritAttrs: false
})
export default class VCollapse extends Vue {
    @Prop({ default: true }) readonly open: boolean | any
    @Prop({ default: 'fade' }) readonly animation: string | undefined
    @Prop({ default: '' }) readonly ariaId: string | undefined
    @Prop({ default: 'is-top' }) readonly position: 'is-top' | 'is-bottom' | undefined

    @Watch('open')
    onOpenChanged (value: boolean) {
        this.isOpen = value
    }

    public isOpen: boolean = this.open

    public toggle () {
        this.isOpen = !this.isOpen
        this.$emit('update:open', this.isOpen)
        this.$emit(this.isOpen ? 'open' : 'close')
    }

    protected render (h: CreateElement) {
        const directives: any[] = [
            { name: 'show', value: this.isOpen }
        ]

        return (
            this.position === 'is-top' ? (
                <div class="collapse">
                    <div class="collapse-trigger" onClick={() => { this.toggle() }}>
                        {this.$scopedSlots.trigger ? this.$scopedSlots.trigger({open: this.isOpen}) : this.$slots.trigger}
                    </div>
                    <transition name={this.animation}>
                        <div class="collapse-content" id={this.ariaId} aria-expanded={this.isOpen} {...{ directives }}>
                            {this.$slots.default}
                        </div>
                    </transition>
                </div>
                
            ) : (
                <div class="collapse">
                    <transition name={this.animation}>
                        <div class="collapse-content" id={this.ariaId} aria-expanded={this.isOpen} {...{ directives }}>
                            {this.$slots.default}
                        </div>
                    </transition>
                    <div class="collapse-trigger" onClick={() => { this.toggle() }}>
                        {this.$scopedSlots.trigger ? this.$scopedSlots.trigger({open: this.isOpen}) : this.$slots.trigger}
                    </div>
                </div>
            )
        )
    }
}