import Vue from 'vue'
import Vuex from 'vuex'
import * as VueHead from 'vue-head'
import VueRouter from 'vue-router'
import VueApollo from 'vue-apollo'
import VueI18n from 'vue-i18n'
import VueLazyload from 'vue-lazyload'
import VueInfiniteLoading from 'vue-infinite-loading'
import { VueCookies } from '@utils/index'
import { VFragment, VueIOSAlert } from '@tool/index'
import { sync } from 'vuex-router-sync'
import { Component } from 'vue-property-decorator'
import { DEFAULT_LOCALE } from '@config/index'
import Vui from '../ui'
import VApp from './app'
import router from './router'
import apolloOptions from './apollo'
import { storeOption } from './store'
import '../ui/scss/vui.scss'
import './styles/pwa.scss'

const Lazyload: any = VueLazyload
const apolloProvider: VueApollo = new VueApollo({
    ...apolloOptions
})

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueHead, {
    separator: '-'
})
Vue.use(VueRouter)
Vue.use(VueApollo)
Vue.use(VueI18n)
Vue.use(Lazyload.install, {
    preLoad: 1.3,
    error: '',
    loading: '',
    attempt: 1,
    listenEvents: [
        'scroll'
    ]
})
Vue.use(VueInfiniteLoading, {
    props: {
        spinner: 'bubbles',
        distance: 500,
        forceUseInfiniteWrapper: true
    },
    system: {
        throttleLimit: 50
    },
    slots: {
        noResults: `There is no any product to show ...`,
        noMore: `There is no more product ...`
    }
})
Vue.use(VueCookies)
Vue.use(VueIOSAlert)
Vue.use(Vui)
Vue.component('v-fragment', VFragment)

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
])

const store: any = new Vuex.Store({
    ...storeOption
})
const i18n: VueI18n = new VueI18n({
    locale: store.state.locale ? store.state.locale : DEFAULT_LOCALE
})

store.$apollo = apolloOptions
sync(store, router)

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    apolloProvider,
    render: h => h(VApp)
})