import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'v-breadcrumb',
    inheritAttrs: false
})
export default class VBreadcrumb extends Vue {
    @Prop({ default: '/' }) readonly separator: string | any
    @Watch('separator')
    onSeparatorChanged(value: string) {
        this.updateChildren()
    }

    public mounted () {
        this.updateChildren()
    }

    public updated () {
        this.$nextTick(() => {
            this.updateChildren()
        })
    }

    public updateChildren () {
        this.$children.forEach((child: any) => {
            child.separator = this.separator
        })
    }

    protected render (h: CreateElement) {
        return (
            <div class="breadcrumb">
                {this.$slots.default}
            </div>
        )
    }
}