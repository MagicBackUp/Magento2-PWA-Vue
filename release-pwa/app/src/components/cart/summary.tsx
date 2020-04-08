import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { I18n } from '@helper/interface'

@Component({
    name: 'v-summary'
})
export default class VSummary extends Vue {
    @State('cart') cart: any

    public i18n: I18n = {
        shoppingSummary: 'Shopping Summary',
        subtotal: 'Subtotal',
        shippingFee: 'Shipping & Handling',
        tax: 'Tax',
        grandTotal: 'Grand Total',
        goCheckout: 'Go Checkout',
        comfirmCheckout: 'Are your sure to checkout now ?'
    }

    public goToCheckout () {
        this.$iosConfirm(this.i18n.comfirmCheckout).then(() => {
            this.$router.push({ path: `/checkout` })
        }).catch((e: Error) => {})
    }

    protected render (h: CreateElement) {
        return (
            <div class="in-summary">
                <h1 class="title">{this.i18n.shoppingSummary}</h1>
                <div class="in-content">
                    {this.cart && this.cart.items.length > 0 && (
                        <ul>
                            <li>
                                <p>{this.i18n.subtotal}</p>
                                <p>{this.cart.prices.subtotal_with_discount_excluding_tax.value}</p>
                            </li>
                            <li>
                                <p>{this.i18n.shippingFee}</p>
                            </li>
                            <li>
                                <p>{this.i18n.tax}</p>
                            </li>
                            <li>
                                <p>{this.i18n.grandTotal}</p>
                                <p>{this.cart.prices.grand_total.value}</p>
                            </li>
                        </ul>
                    )}
                    <v-button type="is-success" disabled={this.cart && this.cart.items.length == 0} onClick={() => { this.goToCheckout() }}>{this.i18n.goCheckout}</v-button>
                </div>
            </div>
        )
    }
}