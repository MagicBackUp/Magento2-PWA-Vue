import { MutationTree } from 'vuex'

const mutations: MutationTree<any> = {
    updateLocale (state, value: string) {
        state.locale = value
    },
    saveStoreConfig (state, config: any) {
        state.storeConfig = config
        state.rootIds = config.root_category_id
    },
    saveCartId (state, id: string) {
        state.cartId = id
    },
    saveCategoryMenu (state, menu: any[]) {
        state.categoryMemu = menu
    },
    saveCmsPage (state, page: any) {
        state.cmsPage = page
    },
    saveCmsBanner (state, banner: any[]) {
        state.cmsBanner = banner
    },
    saveCategory (state, category: any) {
        state.currentCategory = category
        if (category.product_count == 0) state.productCollection = {
            items: [],
            aggregations: []
        }
    },
    saveProductDetail (state, product: any) {
        state.currentProduct = product
    },
    setCategoryFilter (state, filter: any) {
        state.categoryFilter = filter
    },
    setCategorySorter (state, sorter: any) {
        state.categorySorter = sorter
    },
    setCategoryPager (state, pager: any) {
        state.categoryPager = pager
    },
    updateProducts (state, products: any) {
        state.productList = products.items
        state.productFilter = products.filters
        state.productSorter = products.sort_fields
    }
}

export default mutations