import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { VShipping, VSummary } from '@components/cart'

@Component({
    name: 'v-cart',
    head: {
        title: {
            inner: 'PWA',
            complement: 'Cart'
        }
    },
    components: {
        VShipping,
        VSummary
    }
})
export default class VCart extends Vue {
    protected render (h: CreateElement) {
        return (
            <div class="v-cart">
                <div class="container">
                    <section class="in-wrapper">
                        <v-shipping></v-shipping>
                        <v-summary></v-summary>
                    </section>
                </div>
            </div>
        )
    }
}