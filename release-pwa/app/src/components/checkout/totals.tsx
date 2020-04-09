import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { I18n } from '@helper/interface'

@Component({
    name: 'v-totals'
})
export default class VTotals extends Vue {
    @State('cart') cart: any

    public i18n: I18n = {
        summary: 'Summary',
        subtotal: 'Subtotal',
        shippingFee: 'Shipping & Handling',
        tax: 'Tax',
        grandTotal: 'Grand Total',
        paymentCard: 'Payment Card',
        placeHolder: 'Place Holder',
        comfirmCheckout: 'Comfirm to placeholder?'
    }

    public placeHolder () {
        this.$iosConfirm(this.i18n.comfirmCheckout).then(() => {
            
        }).catch((e: Error) => {})
    }

    protected render (h: CreateElement) {
        return (
            <div class="in-summary">
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
                        <v-button type="is-primary" disabled={this.cart && this.cart.items.length == 0} onClick={() => { this.placeHolder() }}>{this.i18n.placeHolder}</v-button>
                    </div>
                </article>
            </div>
        )
    }
}