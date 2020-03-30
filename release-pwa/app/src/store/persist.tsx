import createPersistedState from 'vuex-persistedstate'

const VuexPersisted: any = createPersistedState({
    key: 'magento_pwa_vue',
    storage: window.localStorage,
    fetchBeforeUse: true,
    reducer: (state: any) => {
        return {
            storeConfig: state.storeConfig,
            categoryMemu: state.categoryMemu
        }
    },
    filter: (mutation: any) => {
        return true
    }
})

export default VuexPersisted