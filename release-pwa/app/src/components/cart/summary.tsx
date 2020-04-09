import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { I18n } from '@helper/interface'
import paymentImg from '../../assets/images/payment.jpg'

@Component({
    name: 'v-summary'
})
export default class VSummary extends Vue {
    @State('cart') cart: any

    public i18n: I18n = {
        summary: 'Summary',
        subtotal: 'Subtotal',
        shippingFee: 'Shipping & Handling',
        tax: 'Tax',
        grandTotal: 'Grand Total',
        paymentCard: 'Payment Card',
        secureCheckout: 'Secure Checkout',
        continueShopping: 'Continue Shopping',
        comfirmCheckout: 'Comfirm to checkout?'
    }

    private get paymentUrl () {
        return paymentImg
    }

    public secureCheckout () {
        this.$iosConfirm(this.i18n.comfirmCheckout).then(() => {
            this.$router.push({ path: `/checkout` })
        }).catch((e: Error) => {})
    }

    public continueShopping () {
        this.$router.push({ path: `/` })
    }

    protected render (h: CreateElement) {
        return (
            <div class="in-summary">
                <div class="in-promo">
                    <img v-lazy={this.paymentUrl} alt={this.i18n.paymentCard} />
                </div>
                <article>
                    <h1 class="title">{this.i18n.summary}</h1>
                    {this.cart && this.cart.items.length > 0 && (
                        <v-fragment>
                            <dl class="details">
                                <dt>{`${this.i18n.subtotal} :`}</dt>
                                <dd>{`$` + this.cart.prices.subtotal_including_tax.value}</dd>
                                <dt>{`${this.i18n.shippingFee} :`}</dt>
                                <dd>{`$` + 0}</dd>
                                <dt>{`${this.i18n.tax} :`}</dt>
                                <dd>{`$` + 0}</dd>
                            </dl>
                            <dl class="total">
                                <dt>{`${this.i18n.grandTotal} :`}</dt>
                                <dd>{`$` + this.cart.prices.grand_total.value}</dd>
                            </dl>
                        </v-fragment>
                    )}
                    <div class="buttons">
                        <v-button type="is-primary" disabled={this.cart && this.cart.items.length == 0} onClick={() => { this.secureCheckout() }}>{this.i18n.secureCheckout}</v-button>
                        <v-button type="is-primary" outlined onClick={() => { this.continueShopping() }}>{this.i18n.continueShopping}</v-button>
                    </div>
                </article>
            </div>
        )
    }
}