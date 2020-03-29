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
    updateProducts (state, products: any) {
        state.productCollection = products
    }
}

export default mutations