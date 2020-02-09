const VHomePage: any = () => import(/* webpackChunkName: "vsf-homepage" */ '../pages/homepage')
const VCategory: any = () => import(/* webpackChunkName: "vsf-category" */ '../pages/category')

export {
    VHomePage,
    VCategory
}