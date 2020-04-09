import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { I18n } from '@helper/interface'

@Component({
    name: 'v-shipping'
})
export default class VShipping extends Vue {
    @State('cart') cart: any
    @Action('removeCartItem') removeCartItem: any

    public i18n: I18n = {
        shoppingCart: 'Shopping Cart',
        clearCart: 'Clear Cart',
        delete: 'Delete',
        item: 'Item',
        qty: 'Qty',
        price: 'Price',
        subtotal: 'Subtotal',
        removeItem: 'Remove this item ?'
    }

    public removeItem (e: Event, id: number) {
        e.stopPropagation()
        this.$iosConfirm(this.i18n.removeItem).then(() => {
            this.removeCartItem(id)
        }).catch((e: Error) => {})
    }

    protected render (h: CreateElement) {
        return (
            <div class="in-shipping">
                <h1 class="title">{this.i18n.shoppingCart}</h1>
                {this.cart && this.cart.items.length > 0 && (
                    <v-fragment>
                        <p class="in-head">
                            <span>{this.i18n.item}</span>
                            <span>{this.i18n.qty}</span>
                            <span>{this.i18n.subtotal}</span>
                        </p>
                        <ul class="in-list">
                            {this.cart.items.map((item: any) => {
                                return (
                                    <li itemscope="" itemtype="http://schema.org/Product">
                                        <router-link tag="a" to={`/product/${item.product.url_key}`} class="in-link" title={item.product.name}>
                                            <figure>
                                                <div class="img">
                                                    <img v-lazy={item.product.thumbnail.url} alt={item.product.thumbnail.label} />
                                                </div>
                                                <figcaption class="content">
                                                    <p itemprop="name" class="name">{item.product.name}</p>
                                                    <ul class="options">
                                                        <li aria-label="size">Extra small size</li>
                                                        <li aria-label="color">Red</li>
                                                    </ul>
                                                    <p aria-label={this.i18n.price} class="price">
                                                        <data value={item.product.price_range.minimum_price.final_price.value}>{'$' + item.product.price_range.minimum_price.final_price.value}</data>
                                                    </p>
                                                </figcaption>
                                            </figure>
                                        </router-link>
                                        <div class="operate">
                                            <v-button size="is-small" icon-left={`delete`} onClick={(e: Event) => { this.removeItem(e, item.id) } }>{this.i18n.delete}</v-button>
                                            <v-number value={item.quantity} min={1} controls-position={'compact'}></v-number>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </v-fragment>
                )}
            </div>
        )
    }
}