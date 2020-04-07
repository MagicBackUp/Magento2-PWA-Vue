import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { I18n, Product, ProductAttribute, AttributeLabel } from '@helper/interface'
import { DEFAULT_PRODUCT_CONIGURABLE } from '@config/index'

@Component({
    name: 'v-product-action'
})
export default class VProductAction extends Vue {
    @Prop(Object) product: Product | any

    public i18n: I18n = {
        addTocart: 'Add To Cart'
    }

    public getSwatchData (id: string, value: number) {
        let swatch_data: any = {}
        let attributes: any[] = this.product.attributes

        attributes.forEach((attr: any) => {
            if (attr.attribute_id === parseInt(id)) {
                const options: any[] = attr.attribute_options

                options.forEach((opt: any) => {
                    if (opt.value == value) {
                        swatch_data = opt.swatch_data
                    }
                })
            }
        })

        return swatch_data ? swatch_data.value : null
    }

    public addTocart (e: Event) {
        e.stopPropagation()
        console.log('Adding to cart ...')
    }

    protected render (h: CreateElement) {
        const product: any = this.product
        const options: any[] = this.product.configurable_options || []

        return (
            product && (
                <section class="in-action">
                    {product.type_id === DEFAULT_PRODUCT_CONIGURABLE && (
                        options.map((item: ProductAttribute) => {
                            return (
                                <div class="in-attribute">
                                    <span>{item.label}</span>
                                    {item.values.length > 0 && (
                                        <div class="in-options">
                                            {item.values.map((attr: AttributeLabel) => {
                                                return (
                                                    item.attribute_code === 'color' ? (
                                                        <span aria-label={attr.label} class={`in-${item.attribute_code}`} style={{'background-color': this.getSwatchData(item.attribute_id, attr.value_index)}}></span>
                                                    ) : (
                                                        <span aria-label={attr.label} class={`in-${item.attribute_code}`}>{this.getSwatchData(item.attribute_id, attr.value_index)}</span>
                                                    )
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        })
                    )}
                    <v-button type="is-primary" onClick={(e: Event) => { this.addTocart(e) }}>{this.i18n.addTocart}</v-button>
                </section>
            )
        )
    }
}