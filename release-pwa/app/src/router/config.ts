const VHomePage: any = () => import(/* webpackChunkName: "vsf-homepage" */ '../pages/homepage')
const VCategory: any = () => import(/* webpackChunkName: "vsf-category" */ '../pages/category')
const VProduct: any = () => import(/* webpackChunkName: "vsf-product" */ '../pages/product')
const VCart: any = () => import(/* webpackChunkName: "vsf-cart" */ '../pages/cart')
const VCheckout: any = () => import(/* webpackChunkName: "vsf-checkout" */ '../pages/checkout')
const VLogin: any = () => import(/* webpackChunkName: "vsf-login" */ '../pages/login')
const VRegister: any = () => import(/* webpackChunkName: "vsf-register" */ '../pages/register')
const VAccount: any = () => import(/* webpackChunkName: "vsf-account" */ '../pages/account')
const VPage: any = () => import(/* webpackChunkName: "vsf-page" */ '../pages/page')
const VNotFind: any = () => import(/* webpackChunkName: "vsf-notFind" */ '../pages/notFind')

export {
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
}