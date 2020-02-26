import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { Route } from 'vue-router'

@Component({
    name: 'v-product',
    head: {
        title: function () {
            return this.title
        }
    }
})
export default class VProduct extends Vue {
    @Action('getProductDetail') getProductDetail: any
    
    public beforeRouteEnter (to: Route, from: Route, next: Function) {
        next((vm: Vue) => {
            vm.getProductDetail()
        })
    }
    
    public beforeRouteUpdate (to: Route, from: Route, next: Function) {
        next()
        this.getProductDetail()
    }
    
    protected render (h: CreateElement) {
        return (
            <div class="v-product">
                Product Page
            </div>
        )
    }
}