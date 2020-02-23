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
    }
}

export default mutations