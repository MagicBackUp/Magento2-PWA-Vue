import { Component } from 'vue'
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
        path: '/category*', 
        component: VCategory
    },
    {
        name: 'product',
        path: '/product*',
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
        path: '/page*',
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

router.beforeResolve((to: Route, from: Route, next: any) => {
    const matched: Component[] = router.getMatchedComponents(to)
    const prevMatched: Component[] = router.getMatchedComponents(from)
    
    let diffed: boolean = false
    let activated: Component[] = matched.filter((c: Component, i: number) => diffed || (diffed = (prevMatched[i] !== c)))

    if (!activated.length) {
        return next()
    }

    Promise.all(
        activated
        .filter((c: any) => c.asyncData && (!c.asyncDataFetched || !to.meta.keepAlive))
        .map(async (c: any) => {
            await c.asyncData({ route: to })
            c.asyncDataFetched = true
        })
    ).then(() => {
        next()
    }).catch(() => {
        next()
    })
})

export default router