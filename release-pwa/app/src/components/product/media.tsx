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
                    <div class="in-thumb">
                        {product.media_gallery && product.media_gallery.length > 0 && (
                            product.media_gallery.map((media: any) => {
                                return (
                                    <img src={media.url} alt={media.label} />
                                )
                            })
                        )}
                    </div>
                    <div class="in-graller">
                        <img src={product.thumbnail.url} alt={product.thumbnail.label} />
                    </div>
                </div>
            )
        )
    }
}