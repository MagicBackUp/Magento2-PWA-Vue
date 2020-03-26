import { CreateElement, FunctionalComponentOptions, RenderContext } from 'vue'

interface ProductDetail {
    product: any
}

const VProductDetail: FunctionalComponentOptions<ProductDetail> = {
    name: 'v-product-detail',
    props: {
        product: Object
    },
    functional: true,
    render (h: CreateElement, context: RenderContext<ProductDetail>) {
        return (
            <article class="in-details"></article>
        )
    } 
}

export default VProductDetail