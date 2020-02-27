import { MutationTree } from 'vuex'

const mutations: MutationTree<any> = {
    saveStoreConfig (state, config: any) {
        state.storeConfig = config
    },
    saveCategoryMenu (state, menu: any[]) {
        state.categoryMemu = menu
    },
    saveCmsPage (state, page: any) {
        state.cmsPage = page
    },
    saveCategory (state, category: any) {
        state.currentCategory = category
    },
    saveProductDetail (state, product: any) {
        state.currentProduct = product
    },
    updateProducts (state, products: any) {
        state.productCollection = products
    }
}

export default mutations