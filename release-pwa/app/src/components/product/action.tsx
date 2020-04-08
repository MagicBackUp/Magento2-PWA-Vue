import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { I18n, Product, ProductAttribute, AttributeLabel, ProductOption } from '@helper/interface'
import { DEFAULT_PRODUCT_CONIGURABLE } from '@config/index'

@Component({
    name: 'v-product-action'
})
export default class VProductAction extends Vue {
    @Prop(Object) product: Product | any

    public i18n: I18n = {
        addTocart: 'Add To Cart',
        buyNow: 'Buy Now'
    }
    public qty: number = 1
    public options: ProductOption = {}

    @Action('addSimpleToCart') addSimpleToCart: any
    @Action('addConfigurableToCart') addConfigurableToCart: any

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

    public addTocart (sku: string, e: Event) {
        e.stopPropagation()
        if (this.product.type_id === DEFAULT_PRODUCT_CONIGURABLE) {
            // this.addConfigurableToCart({
            //     sku: sku, 
            //     qty: this.qty,
            //     options: this.options
            // })
            // this.$vui.toast.open({
            //     duration: 5000,
            //     message: `Something's not good, also I'm on bottom`,
            //     position: 'is-bottom',
            //     type: 'is-danger'
            // })
        } else {
            this.addSimpleToCart({ 
                sku: sku, 
                qty: this.qty 
            })
        }
    }

    public buyNow (sku: string, e: Event) {
        e.stopPropagation()
        console.log('Adding to cart ...')
    }

    protected render (h: CreateElement) {
        const product: Product = this.product
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
                    <v-number vModel={this.qty} min={1} controls-position={'compact'}></v-number>
                    <section class="in-buttons">
                        <v-button type="is-primary" onClick={(e: Event) => { this.addTocart(product.sku, e) }}>{this.i18n.addTocart}</v-button>
                        <v-button type="is-success" onClick={(e: Event) => { this.buyNow(product.sku, e) }}>{this.i18n.buyNow}</v-button>
                    </section>
                </section>
            )
        )
    }
}