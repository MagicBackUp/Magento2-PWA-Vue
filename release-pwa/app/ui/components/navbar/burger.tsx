import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'v-navbar-burger'
})
export default class VNavBarBurger extends Vue {
    @Prop({ default: false }) readonly isOpened: boolean | any

    protected render (h: CreateElement) {
        return (
            <a
                href="javascript:;"
                role="button"
                class={['navbar-burger burger', { 'is-active': this.isOpened }]}
                aria-label="menu"
                aria-expanded={this.isOpened}
                {...{on: this.$listeners}}>
                <span aria-hidden="true"/>
                <span aria-hidden="true"/>
                <span aria-hidden="true"/>
            </a>
        )
    }
}