import Vue, { CreateElement } from 'vue'
import { Route } from 'vue-router'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-product',
    head: {
        title: {
            inner: 'PWA',
            complement: 'Product'
        }
    }
})
export default class VProduct extends Vue {
    public beforeRouteEnter (to: Route, from: Route, next: Function) {
        next((vm: Vue) => {
            vm.getProductDetail()
        })
    }
    
    public beforeRouteUpdate (to: Route, from: Route, next: Function) {
        next((vm: Vue) => {
            vm.getProductDetail()
        })
    }
    
    protected render (h: CreateElement) {
        return (
            <div class="v-product">
                Product Page
            </div>
        )
    }
}