import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { State, Action, Mutation } from 'vuex-class'
import { VProductItem } from '@components/common'
import { DEFAULT_CATEGORY_SORT_KEY, DEFAULT_CATEGORY_SORT_VALUE, DEFAULT_CATEGORY_PAGE_SIZE } from '@config/index'

@Component({
    name: 'v-products-list',
    components: {
        VProductItem
    }
})
export default class VProductsList extends Vue {
    @Prop(Number) readonly ids: number | undefined
    @Watch('$route', { deep: true })
    onRouteChange (to: any, from: any) {
        if (to.name === 'category') {
            this.resetCategory()
        }
    }

    @State('infiniteId') infiniteId: any
    @State('categoryPager') categoryPager: any
    @State('productList') productList: any
    @Action('getProductList') getProductList: any
    @Mutation('setCategoryFilter') setCategoryFilter: any
    @Mutation('setCategorySorter') setCategorySorter: any
    @Mutation('setCategoryPager') setCategoryPager: any
    @Mutation('updateProducts') updateProducts: any
    @Mutation('resetCategory') resetCategory: any

    private mounted () {
        this.init()
    }

    public init () {
        this.setCategoryFilter({ category_id: { eq: this.ids }})
        this.setCategorySorter({ [DEFAULT_CATEGORY_SORT_KEY]: DEFAULT_CATEGORY_SORT_VALUE })
        this.setCategoryPager({ current_page: 1, page_size: DEFAULT_CATEGORY_PAGE_SIZE, total_pages: 1 })
    }

    public infiniteScroll ($state: any) {
        if (this.categoryPager.current_page <= this.categoryPager.total_pages) {
            this.getProductList().then((response: any) => {
                if (response) {
                    const products: any = response.data.products

                    this.updateProducts(products)
                    if (products.items.length < this.categoryPager.page_size) {
                        $state.complete()
                    } else {
                        $state.loaded()
                    }
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
                        return (
                            <li key={index} itemscope itemtype="https://schema.org/Product">
                                <v-product-item product={product}></v-product-item>
                            </li>
                        )
                    })}
                </ul>
                <infinite-loading identifier={this.infiniteId} onInfinite={($state: any) => { this.infiniteScroll($state) }}></infinite-loading>
            </div>
        )
    }
}