import VueRouter, { RouteConfig, Route } from 'vue-router'
import { 
    VHomePage, 
    VCategory,  
    VProduct, 
    VCart, 
    VCheckout, 
    VLogin, 
    VRegister, 
    VAccount, 
    VPage, 
    VNotFind 
} from './config'

const routes: Array<RouteConfig> = [
    {
        name: 'homepage',
        path: '/', 
        component: VHomePage
    },
    { 
        name: 'category',
        path: '/category', 
        component: VCategory
    },
    {
        name: 'product',
        path: '/product',
        component: VProduct
    },
    {
        name: 'cart',
        path: '/cart',
        component: VCart
    },
    {
        name: 'checkout',
        path: '/checkout',
        component: VCheckout
    },
    {
        name: 'login',
        path: '/login',
        component: VLogin
    },
    {
        name: 'register',
        path: '/register',
        component: VRegister
    },
    {
        name: 'account',
        path: '/account',
        component: VAccount
    },
    {
        name: 'page',
        path: '/page',
        component: VPage
    },
    {
        name: '404',
        path: '*',
		component: VNotFind
    }
]

const router: VueRouter = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior (to: Route, from: Route, savedPosition: any) {
        return new Promise((resolve: any, reject: any) => {
            setTimeout(() => {
                resolve({ x: 0, y: 0 })
            }, 500)
        })
    }
})

export default router