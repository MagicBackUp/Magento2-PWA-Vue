import { ApolloActionTree } from './interface'
import { getStoreConfig } from '../graphql/getStoreConfig.gql'

const actions: ApolloActionTree<any, any> = {
    async getStoreConfig ({ commit, apollo }) {
        let res: any = await apollo.query({
            query: getStoreConfig
        })

        if (res) {
            const storeConfig: any = res.data.storeConfig

            commit('saveStoreConfig', storeConfig)
        }
    }
}

export default actions