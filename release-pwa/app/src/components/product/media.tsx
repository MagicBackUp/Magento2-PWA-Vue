import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'v-product-media'
})
export default class VProductMedia extends Vue {
    @Prop(Object) product: object | any

    protected render (h: CreateElement) {
        const product: any = this.product

        return (
            product && (
                <div class="v-media">
                    <img src={product.thumbnail.url} alt={product.thumbnail.label} />
                </div>
            )
                           
        )
    }
}