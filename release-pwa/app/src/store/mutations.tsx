import { MutationTree } from 'vuex'

const mutations: MutationTree<any> = {
    saveStoreConfig (state, config: any) {
        state.storeConfig = config
    }
}

export default mutations