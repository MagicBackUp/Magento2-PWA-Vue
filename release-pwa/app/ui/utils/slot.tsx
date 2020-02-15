import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'v-slot-component'
})
export default class VSlotComponent extends Vue {
    @Prop() readonly component!: any
    @Prop({ default: 'default' }) readonly name: string | any
    @Prop(Boolean) readonly scoped: boolean | undefined
    @Prop(Object) readonly props: object | undefined
    @Prop({ default: 'div' }) readonly tag: string | undefined
    @Prop({ default: 'hook:updated' }) readonly event: string | undefined

    public created () {
        if (this.isVueComponent()) {
            this.component.$on(this.event, this.refresh)
        }
    }

    public beforeDestroy () {
        if (this.isVueComponent()) {
            this.component.$off(this.event, this.refresh)
        }
    }

    public refresh () {
        this.$forceUpdate()
    }

    public isVueComponent () {
        return this.component && this.component._isVue
    }

    protected render (h: CreateElement) {
        if (this.isVueComponent()) {
            return h(this.tag, {},
                this.scoped ? this.component.$scopedSlots[this.name](this.props)
                    : this.component.$slots[this.name])
        }
    }
}