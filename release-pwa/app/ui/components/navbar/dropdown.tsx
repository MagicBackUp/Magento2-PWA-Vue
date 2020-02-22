import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { clickOutside } from '../../directives'

@Component({
    name: 'v-navbar-dropdown',
    directives: {
        clickOutside
    }
})
export default class VNavBarDropDown extends Vue {
    @Prop(String) readonly label: string | any
    @Prop(Boolean) readonly hoverable: boolean | any
    @Prop(Boolean) readonly active: boolean | any
    @Prop(Boolean) readonly right: boolean | any
    @Prop(Boolean) readonly arrowless: boolean | any
    @Prop(Boolean) readonly boxed: boolean | any
    @Prop({ default: true }) readonly closeOnClick: boolean | any

    @Watch('active')
    onActiveChanged(value: boolean) {
        this.newActive = value
    }

    private newActive: boolean = this.active
    private isHoverable: boolean = this.hoverable
    private _isNavDropdown: boolean = true

    public showMenu () {
        this.newActive = true
    }
 
    public closeMenu () {
        this.newActive = !this.closeOnClick

        if (this.hoverable && this.closeOnClick) {
            this.isHoverable = false
        }
    }

    public checkHoverable () {
        if (this.hoverable) {
            this.isHoverable = true
        }
    }

    public handleClick (e: Event) {
        e.stopPropagation()
        this.newActive = !this.newActive
    }

    protected render (h: CreateElement) {
        return (
            <div
                class={['navbar-item has-dropdown', {
                    'is-hoverable': this.isHoverable,
                    'is-active': this.newActive
                }]}
                onMouseenter={() => { this.checkHoverable() }}
                {...{directives: {
                    name: 'click-outside',
                    value: () => { this.closeMenu() }
                }}}>
                <a
                    class={['navbar-link', {
                        'is-arrowless': this.arrowless
                    }]}
                    href="javascript:;"
                    role="menuitem"
                    title={this.label}
                    aria-haspopup="true"
                    onClick={(e: Event) => { this.handleClick(e) }}>
                    {this.label ? (
                        this.label
                    ) : (
                        this.$slots.label
                    )}
                </a>
                <div
                    class={['navbar-dropdown', {
                        'is-right': this.right,
                        'is-boxed': this.boxed
                    }]}>
                    {this.$slots.default}
                </div>
            </div>
        )
    }
}