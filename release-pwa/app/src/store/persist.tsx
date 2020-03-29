import createPersistedState from 'vuex-persistedstate'

const VuexPersisted: any = createPersistedState({
    key: 'magento_pwa_vue',
    storage: window.localStorage,
    fetchBeforeUse: false,
    reducer: (state: any) => {
        return {
            storeConfig: state.storeConfig,
            categoryMemu: state.categoryMemu
        }
    },
    subscriber: (store: any) => store.subscribe((mutation: any, state: any) => {
        console.log(mutation.type)
        console.log(mutation.payload)
    })
})

export default VuexPersisted