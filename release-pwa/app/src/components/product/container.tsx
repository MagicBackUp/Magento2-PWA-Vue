import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Product } from '@helper/interface'
import VProductDetail from './details'
import VProductAction from './action'

@Component({
    name: 'v-product-container',
    components: {
        VProductDetail,
        VProductAction
    }
})
export default class VProductContainer extends Vue {
    @Prop(Object) product: Product | any

    protected render (h: CreateElement) {
        const product: Product = this.product

        return (
            product && (
                <article class="v-container">
                    <v-product-detail product={product}></v-product-detail>
                    <v-product-action product={product}></v-product-action>
                </article>
            )
        )
    }
}