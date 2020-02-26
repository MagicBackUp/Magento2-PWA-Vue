import { ApolloActionTree } from './interface'
import { validateRouter } from '../graphql/validateRouter.gql'
import { getStoreConfig } from '../graphql/getStoreConfig.gql'
import { getNavigation } from '../graphql/getNavigation.gql'
import { getCmsPage } from '../graphql/getCmsPage.gql'
import { getCategoryInfo } from '../graphql/getCategoryInfo.gql'
import { getProductDetail } from '../graphql/getProductDetail.gql'

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
    async getNavigation ({ commit, state, apollo }) {
        let { rootIds } = state
        let res: any = await apollo.query({
            query: getNavigation,
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
    },
    async getCmsPage ({ commit, state, apollo }) {
        let path: string = state.route.path
        let res: any = await apollo.query({
            query: getCmsPage,
            variables: {
                identifier: path.replace('/page/', '')
            }
        })

        if (res.data) {
            commit('saveCmsPage', res.data.cmsPage)
        }
    },
    async getCategoryInfo ({ commit, state, apollo }) {
        let path: string = state.route.path
        let res: any = await apollo.query({
            query: getCategoryInfo,
            variables: {
                filters: {
                    url_key: {
                        eq: path.replace('/category/', '')
                    }
                }
            }
        })

        if (res.data) {
            commit('saveCategory', res.data.categoryList[0])
        }
    },
    async getProductDetail ({ commit, state, apollo }) {
        let path: string = state.route.path
        let res: any = await apollo.query({
            query: getProductDetail,
            variables: {
                filters: {
                    url_key: {
                        eq: path.replace('/product/', '')
                    }
                }
            }
        })

        if (res.data) {
            console.log(res.data)
        }
    }
}

export default actions