import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { VImage } from '@components/common'

@Component({
    name: 'v-product-item',
    components: {
        VImage
    }
})
export default class VProductItem extends Vue {
    @Prop(Object) readonly product: object | any

    public getProductAttr (code: string) {
        let attrs: string = ''
        let attributes: any[] = this.product.attributes

        attributes.forEach((attr: any) => {
            if (attr.attribute_code === code) {
                attrs = attr.attribute_value
            }
        })

        return attrs
    }

    protected render (h: CreateElement) {
        const item: any = this.product
        const image: any = item.thumbnail
        const mini_price: any = item.price_range.minimum_price

        return (
            <v-fragment>
                <meta itemprop="sku" content={item.sku} />
                <div class="v-product-item">
                    <router-link tag="a" to={`/product/${item.url_key}`} title={item.title}>
                        <figure class="in-figure">
                            <div class="picture">
                                <v-image url={image.url} title={image.label}></v-image>
                            </div>
                        </figure>
                        <div class="in-content">
                            <p class="price" itemprop="offers" itemscope="" itemtype="https://schema.org/AggregateOffer">
                                <span>
                                    <data value={mini_price.final_price.value}>
                                        <span>$</span>
                                        <span itemprop="lowPrice">{mini_price.final_price.value}</span>
                                    </data>
                                </span>
                                <meta itemprop="priceCurrency" content="USD" />    
                            </p>
                            <p class="name" itemprop="name">{item.name}</p>
                            <p class="brand" itemprop="brand">{this.getProductAttr('brand')}</p>
                        </div>
                    </router-link>
                </div>
            </v-fragment>
        )
    }
}