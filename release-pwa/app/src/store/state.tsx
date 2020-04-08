import * as Cookies from 'js-cookie'
import { DEFAULT_COOKIES_CART_ID } from '@config/index'

const state: any = {
    storeConfig: null,
    rootIds: null,
    cartId: Cookies.get(DEFAULT_COOKIES_CART_ID) || null,
    cart: null,
    isLogin: false,
    categoryMemu: [],
    cmsPage: null,
    cmsBanner: [],
    currentCategory: null,
    currentProduct: null,
    productList: [],
    productFilter: [],
    productSorter: [],
    categoryFilter: null,
    categorySorter: null,
    categoryPager: null,
    categoryPriceRange: [],
    infiniteId: + new Date(),
    resetCategoryKey: + new Date
}

export default state