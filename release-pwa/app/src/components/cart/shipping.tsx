import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { I18n } from '@helper/interface'

@Component({
    name: 'v-shipping'
})
export default class VShipping extends Vue {
    @State('cart') cart: any

    public i18n: I18n = {
        shoppingCart: 'Shopping Cart',
        clearCart: 'Clear Cart',
        remove: 'Remove',
        quantity: 'Quantity'
    }

    protected render (h: CreateElement) {
        return (
            <div class="in-shipping">
                <h1 class="title">{this.i18n.shoppingCart}</h1>
                {this.cart && this.cart.items.length > 0 && (
                    <ul class="in-list">
                        {this.cart.items.map((item: any) => {
                            return (
                                <li>
                                    <div class="img">
                                        <img v-lazy={item.product.thumbnail.url} alt={item.product.thumbnail.label} />
                                    </div>
                                    <div class="info">
                                        <a href="javascript:;" title={item.product.name}>{item.product.name}</a>
                                        <small class="sku">{item.product.sku}</small>
                                        <p class="qty">
                                            <span>{this.i18n.quantity}</span>
                                            <span>{item.quantity}</span>
                                        </p>
                                    </div>
                                    <div class="operation">
                                        <p class="price">{item.product.price_range.minimum_price.final_price.value}</p>
                                        <a href="javascript" class="remove" title={this.i18n.remove}>{this.i18n.remove}</a>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        )
    }
}