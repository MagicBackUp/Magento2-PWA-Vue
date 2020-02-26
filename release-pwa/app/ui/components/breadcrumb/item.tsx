import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'v-breadcrumb-item'
})
export default class VBreadcrumbItem extends Vue {
    @Prop([String, Object]) readonly to: string | object | any
    @Prop({ default: false }) readonly replace: boolean | any
    @Prop({ default: '_parent' }) readonly target: '_blank' | '_self' | '_parent' | '_top' | undefined
    @Prop({ default: false }) readonly append?: boolean | any

    public separator: string = ''
    public showSeparator: boolean = false

    private get linkUrl () {
        const type: any = typeof this.to
        if (type !== 'string') {
            return null
        }

        if (this.to.includes('//')) {
            return this.to
        }

        const router: any = this.$router

        if (router) {
            const current: any = this.$route
            const route: any = router.resolve(this.to, current, this.append)
            return route ? route.href : this.to
        }

        return this.to
    }

    public mounted () {
        this.showSeparator = this.$slots.separator !== undefined
    }

    public handleClick (new_window: boolean = false) {
        const router: any = this.$router

        if (new_window) {
            let to: any  = this.to
            if (router) {
                const current: any  = this.$route
                const route: any  = router.resolve(this.to, current, this.append)
                to = route ? route.href : this.to
            }

            window.open(to)
        } else {
            if (router) {
                this.replace ? this.$router.replace(this.to, () => {}) : this.$router.push(this.to, () => {})
            } else {
                window.location.href = this.to
            }
        }
    }

    public handleCheckClick (event: any, new_window: boolean = false) {
        if (this.to) {
            if (this.target === '_blank') {
                return false
            } else {
                event.preventDefault()
                this.handleClick(new_window)
            }
        }
    }

    protected render (h: CreateElement) {
        return (
            <span>
                {this.to ? (
                    <a
                        href={this.linkUrl}
                        class="link"
                        target={this.target}
                        onClick={(e: Event) => { this.handleCheckClick(e, false) }}>
                        {this.$slots.default}
                    </a>
                ) : (
                    <span class="link">{this.$slots.default}</span>
                )}
                {!this.showSeparator ? (
                    <span class="separator" domPropsInnerHTML={this.separator}></span>
                ) : (
                    <span class="separator">{this.$slots.separator}</span>
                )}
            </span>
        )
    }
}