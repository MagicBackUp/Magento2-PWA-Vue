import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { State, Action, Mutation } from 'vuex-class'
import { VProductItem } from '@components/common'

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
            this.routerCategory()
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
    @Mutation('routerCategory') routerCategory: any

    private mounted () {
        this.init()
    }

    public init () {
        this.setCategoryFilter({ category_id: { eq: this.ids }})
        this.setCategorySorter({ position: 'ASC' })
        this.setCategoryPager({ currentPage: 1, pageSize: 12, totalPages: 1 })
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
                {console.log(this.infiniteId)}
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