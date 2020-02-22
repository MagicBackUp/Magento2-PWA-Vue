import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'v-navbar-item',
    inheritAttrs: false
})
export default class VNavBarItem extends Vue {
    @Prop({ default: 'a' }) readonly tag: string | any
    @Prop(Boolean) readonly active: boolean | any

    private clickableWhiteList: string[] = ['div', 'span']

    public mounted () {
        if (typeof window !== 'undefined') {
            this.$el.addEventListener('click', this.handleClickEvent)
            document.addEventListener('keyup', this.keyPress)
        }
    }

    public beforeDestroy () {
        if (typeof window !== 'undefined') {
            this.$el.removeEventListener('click', this.handleClickEvent)
            document.removeEventListener('keyup', this.keyPress)
        }
    }

    public keyPress (event: any) {
        if (event.keyCode === 27) {
            this.$parent.closeMenu()
        }
    }

    public handleClickEvent (event: any) {
        const isOnWhiteList: boolean = this.clickableWhiteList.some((item) => item === event.target.localName)
        if (!isOnWhiteList) {
            if (this.$parent.$data._isNavDropdown) {
                this.$parent.closeMenu()
                this.$parent.$parent.closeMenu()
            } else {
                this.$parent.closeMenu()
            }
        }
    }

    protected render (h: CreateElement) {
        const Component: string = this.tag

        return (
            <Component
                class={['navbar-item', { 'is-active': this.active }]}
                {...{attrs: this.$attrs}}
                {...{on: this.$listeners}}>
                {this.$slots.default}
            </Component>
        )
    }
}