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
        let result: any = null
        let attributes: any[] = this.product.attributes

        attributes.forEach((attr: any) => {
            if (attr.attribute_code === code) {
                result = attr
            }
        })

        return result
    }

    public getColorOptions (): any[] {
        const attrs: any = this.getProductAttr('color')

        return attrs.attribute_options
    }

    protected render (h: CreateElement) {
        const item: any = this.product
        const image: any = item.thumbnail
        const mini_price: any = item.price_range.minimum_price
        const brandAttr: any = this.getProductAttr('brand')
        const colorAttr: any[] = this.getColorOptions()

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
                            {item.type_id === 'configurable' && (
                                <div class="in-options">
                                    {colorAttr.map((attr: any) => {
                                        return (
                                            <span aria-label={attr.label} class="in-color" style={{'background-color': attr.swatch_data.value}}></span>
                                        )
                                    })}
                                </div>
                            )}
                            <p class="name" itemprop="name">{item.name}</p>
                            <p class="brand" itemprop="brand">{brandAttr.attribute_value}</p>
                        </div>
                    </router-link>
                </div>
            </v-fragment>
        )
    }
}