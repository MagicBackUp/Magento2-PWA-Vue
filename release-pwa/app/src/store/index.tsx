import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import apolloPlugin from './plugins'

const storeOption: any = {
    state: state,
    getters,
    actions,
    mutations,
    modules: {},
    plugins: [
        apolloPlugin
    ]
}

export default storeOption