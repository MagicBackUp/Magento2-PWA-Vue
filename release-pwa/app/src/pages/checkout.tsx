import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { VViews, VTotals } from '@components/checkout'

@Component({
    name: 'v-checkout',
    head: {
        title: {
            inner: 'PWA',
            complement: 'Checkout'
        }
    },
    components: {
        VViews,
        VTotals
    }
})
export default class VCheckout extends Vue {
    protected render (h: CreateElement) {
        return (
            <div class="v-checkout">
                <div class="container">
                    <section class="in-wrapper">
                        <v-views></v-views>
                        <v-totals></v-totals>
                    </section>
                </div>
            </div>
        )
    }
}