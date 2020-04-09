import { ApolloActionTree } from './interface'
import { validateRouter } from '../graphql/validateRouter.gql'
import { getStoreConfig } from '../graphql/getStoreConfig.gql'
import { getNavigation } from '../graphql/getNavigation.gql'
import { createEmptyCart } from '../graphql/createEmptyCart.gql'
import { getCustomerCart } from '../graphql/getCustomerCart.gql'
import { getCartDetails } from '../graphql/getCartDetails.gql'
import { getCmsPage } from '../graphql/getCmsPage.gql'
import { getSlider } from '../graphql/getSlider.gql'
import { getCategoryInfo } from '../graphql/getCategoryInfo.gql'
import { getProductDetail } from '../graphql/getProductDetail.gql'
import { getProductList } from '../graphql/getProductList.gql'
import { getBlogPosts } from '../graphql/getBlogPosts.gql'
import { addSimpleToCart } from '../graphql/addSimpleToCart.gql'
import { addConfigurableToCart } from '../graphql/addConfigurableToCart.gql'
import { removeCartItem } from '../graphql/removeCartItem.gql'

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
    async getStoreConfig ({ commit, dispatch, apollo, iosAlert }) {
        try {
            let res: any = await apollo.query({
                query: getStoreConfig
            })

            if (res.data) {
                const storeConfig: any = res.data.storeConfig
                commit('saveStoreConfig', storeConfig)
                dispatch('getNavigation')
            }
        } catch ({ graphQLErrors }) {
            const message: string = graphQLErrors[0].message
            iosAlert(message).then(() => {
                
            }).catch((e: Error) => {})
        }    
    },
    async getNavigation ({ commit, state, apollo, iosAlert }) {
        let { rootIds } = state

        try {
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
        } catch ({ graphQLErrors }) {
            const message: string = graphQLErrors[0].message
            iosAlert(message).then(() => {
                
            }).catch((e: Error) => {})
        }    
    },
    async createEmptyCart ({ commit, apollo, cookies, iosAlert }) {
        let cart_id: string | undefined = cookies.get('cart_id')

        if (cart_id) return false

        try {
            let res: any = await apollo.mutate({
                mutation: createEmptyCart,
                variables: {
                    cart_id: null
                }
            })

            if (res.data) {
                const cart_id: string = res.data.createEmptyCart
                cookies.set('cart_id', cart_id, { expires: 604800 })
                commit('saveCartId', cart_id)
            }
        } catch ({ graphQLErrors }) {
            const message: string = graphQLErrors[0].message
            iosAlert(message).then(() => {
                
            }).catch((e: Error) => {})
        }    
    },
    async getCartInfo ({ commit, state, apollo, iosAlert }, id?: string) {
        let { isLogin, cartId } = state

        try {
            let res: any = await apollo.query({
                query: isLogin ? getCustomerCart : getCartDetails,
                variables: isLogin ? {} : { cart_id: cartId }
            })
    
            if (res.data) {
                const cart: any = res.data.cart
                commit('saveCartInfo', cart)
            }
        } catch ({ graphQLErrors }) {
            const message: string = graphQLErrors[0].message
            iosAlert(message).then(() => {
                
            }).catch((e: Error) => {})
        }    
    },
    async getCmsPage ({ commit, state, apollo, iosAlert }) {
        let path: string = state.route.path

        try {
            let res: any = await apollo.query({
                query: getCmsPage,
                variables: {
                    identifier: path.replace('/page/', '')
                }
            })

            if (res.data) {
                commit('saveCmsPage', res.data.cmsPage)
            }
        } catch ({ graphQLErrors }) {
            const message: string = graphQLErrors[0].message
            iosAlert(message).then(() => {
                
            }).catch((e: Error) => {})
        }    
    },
    async getBanner ({ commit, apollo, iosAlert }) {
        try {
            let res: any = await apollo.query({
                query: getSlider
            })

            if (res.data) {
                const banner: any[] = res.data.slider.banner
                commit('saveCmsBanner', banner)
            }
        } catch ({ graphQLErrors }) {
            const message: string = graphQLErrors[0].message
            iosAlert(message).then(() => {
                
            }).catch((e: Error) => {})
        }    
    },
    async getCategoryInfo ({ commit, state, apollo, iosAlert }) {
        let path: string = state.route.path

        try {
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
                const category: any = res.data.categoryList[0]
                commit('saveCategory', category)
            }
        } catch ({ graphQLErrors }) {
            const message: string = graphQLErrors[0].message
            iosAlert(message).then(() => {
                
            }).catch((e: Error) => {})
        }    
    },
    async getProductList ({ state, apollo }) {
        const { categoryFilter, categorySorter, categoryPager } = state

        return await apollo.query({
            query: getProductList,
            variables: {
                filter: categoryFilter,
                pageSize: categoryPager.page_size,
                currentPage: categoryPager.current_page,
                sort: categorySorter
            }
        })
    },
    async getProductDetail ({ commit, state, apollo, iosAlert }) {
        let path: string = state.route.path

        try {
            let res: any = await apollo.query({
                query: getProductDetail,
                variables: {
                    filter: {
                        url_key: {
                            eq: path.replace('/product/', '')
                        }
                    }
                }
            })

            if (res.data) {
                const product: any = res.data.products.items[0]
                commit('saveProductDetail', product)
            }
        } catch ({ graphQLErrors }) {
            const message: string = graphQLErrors[0].message
            iosAlert(message).then(() => {
                
            }).catch((e: Error) => {})
        }    
    },
    async getBlogList ({ commit, state, apollo, iosAlert }) {
        try {
            let res: any = await apollo.query({
                query: getBlogPosts,
                variables: {
                    filter: {},
                    pageSize: 20,
                    currentPage: 1,
                    sort: 'ASC'
                }
            })

            if (res.data) {
                console.log(res.data)
            }
        } catch ({ graphQLErrors }) {
            const message: string = graphQLErrors[0].message
            iosAlert(message).then(() => {
                
            }).catch((e: Error) => {})
        }    
    },
    async addSimpleToCart ({ commit, state, apollo, iosAlert }, playload: any) {
        let { cartId } = state
        let { qty, sku } = playload

        try {
            let res: any = await apollo.mutate({
                mutation: addSimpleToCart,
                variables: {
                    cart_id: cartId,
                    quantity: qty,
                    sku: sku
                }
            })

            if (res.data) {
                const cart: any = res.data.addSimpleProductsToCart.cart
                commit('saveCartInfo', cart)
            }
        } catch ({ graphQLErrors }) {
            const message: string = graphQLErrors[0].message
            iosAlert(message).then(() => {
                
            }).catch((e: Error) => {})
        }
    },
    async addConfigurableToCart ({ commit, state, apollo, iosAlert }, playload: any) {
        let { cartId } = state
        let { qty, sku, options } = playload

        try {
            let res: any = await apollo.mutate({
                mutation: addConfigurableToCart,
                variables: {
                    cart_id: cartId,
                    quantity: qty,
                    sku: sku,
                    options: options
                }
            })

            if (res.data) {
                const cart: any = res.data.addConfigurableToCart.cart
                commit('saveCartInfo', cart)
            }
        } catch ({ graphQLErrors }) {
            const message: string = graphQLErrors[0].message
            iosAlert(message).then(() => {
                
            }).catch((e: Error) => {})
        }
    },
    async removeCartItem ({ commit, state, apollo, iosAlert }, id: number) {
        let { cartId } = state

        try {
            let res: any = await apollo.mutate({
                mutation: removeCartItem,
                variables: {
                    cart_id: cartId,
                    cart_item_id: id
                }
            })

            if (res.data) {
                const cart: any = res.data.removeItemFromCart.cart
                commit('saveCartInfo', cart)
            }
        } catch ({ graphQLErrors }) {
            const message: string = graphQLErrors[0].message
            iosAlert(message).then(() => {
                
            }).catch((e: Error) => {})
        }
    }
}

export default actions