import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { State, Action, Mutation } from 'vuex-class'

@Component({
    name: 'v-products-list'
})
export default class VProductsList extends Vue {
    @Prop(Number) readonly ids: number | undefined
    @Watch('$route', { deep: true })
    onRouteChange (to: any, from: any) {
        console.log(to)
    }

    public infiniteId: number = + new Date()

    @State('categoryPager') categoryPager: any
    @State('productList') productList: any
    @Action('getProductList') getProductList: any
    @Mutation('setCategoryFilter') setCategoryFilter: any
    @Mutation('setCategorySorter') setCategorySorter: any
    @Mutation('setCategoryPager') setCategoryPager: any
    @Mutation('updateProducts') updateProducts: any

    private mounted () {
        this.init()
    }

    public init () {
        this.setCategoryFilter({ category_id: { eq: this.ids }})
        this.setCategorySorter({ position: 'ASC' })
        this.setCategoryPager({ currentPage: 1, pageSize: 12, totalPages: 1 })
    }

    public getProductAttr (code: string) {
        const attributes: any[] = this.productList
    }

    public infiniteScroll ($state: any) {
        if (this.categoryPager.currentPage <= this.categoryPager.totalPages) {
            this.getProductList().then((response: any) => {
                if (response) {
                    const products: any = response.data.products

                    this.updateProducts(products)
                    // if (products.items.length < this.pageSize) {
                        $state.complete()
                    // } else {
                    //     this.setCategoryPager()
                    //     $state.loaded()
                    // }
                } 
            }).catch((error: any) => {
                $state.complete()
            })
        } else {
            $state.complete()
        }
    }

    protected render (h: CreateElement) {
        const products: any[] = this.productList

        return (
            <div class="v-produts-list">
                <ul class="list">
                    {products.map((product: any, index: number) => {
                        const image: any = product.thumbnail
                        const mini_price: any = product.price_range.minimum_price

                        return (
                            <li key={index} itemscope itemtype="https://schema.org/Product">
                                <meta itemprop="sku" content={product.sku} />
                                <div class="v-product-item">
                                    <router-link tag="a" to={`/product/${product.url_key}`} title={product.title}>
                                        <figure class="in-figure">
                                            <div class="picture">
                                                <img src={image.url} alt={image.label} />
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
                                            <p class="name" itemprop="brand">{product.name}</p>
                                            <p class="brand" itemprop="brand">{this.getProductAttr('brand')}</p>
                                        </div>
                                    </router-link>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <infinite-loading identifier={this.infiniteId} onInfinite={($state: any) => { this.infiniteScroll($state) }}></infinite-loading>
            </div>
        )
    }
}