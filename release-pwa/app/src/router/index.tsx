import VueRouter, { RouteConfig, Route } from 'vue-router'
import { VHomePage, VCategory } from './config'

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