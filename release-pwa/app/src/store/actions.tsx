import { ApolloActionTree } from './interface'
import { validateRouter } from '../graphql/validateRouter.gql'
import { getStoreConfig } from '../graphql/getStoreConfig.gql'
import { getCategoryList } from '../graphql/getCategoryList.gql'

const actions: ApolloActionTree<any, any> = {
    async validateRouter ({ apollo }, url: string) {
        return await apollo.query({
            query: validateRouter,
            variables: {
                url: url
            }
        })
    },
    async routeInit ({ dispatch }) {
        dispatch('getStoreConfig')
    },
    async getStoreConfig ({ commit, apollo }) {
        let res: any = await apollo.query({
            query: getStoreConfig
        })

        if (res.data) {
            const storeConfig: any = res.data.storeConfig
            commit('saveStoreConfig', storeConfig)
        }
    },
    async getCategoryList ({ commit, state, apollo }) {
        let { rootIds } = state
        let res: any = await apollo.query({
            query: getCategoryList,
            variables: {
                filters: {
                    ids: {
                        eq: rootIds
                    }
                }
            }
        })

        if (res.data) {
            const categoryMenu: any = res.data.categoryList[0].children
            commit('saveCategoryMenu', categoryMenu)
        }
    }
}

export default actions