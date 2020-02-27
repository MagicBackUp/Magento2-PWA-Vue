import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { Route } from 'vue-router'
import { VProductMedia } from '@components/product'

@Component({
    name: 'v-product',
    head: {
        title: function () {
            return this.title
        }
    },
    components: {
        VProductMedia
    }
})
export default class VProduct extends Vue {
    @Watch('currentProduct')
    onCurrentProductChanged(product: any) {
        this.title = {
            inner: 'PWA',
            complement: product.name
        }
        this.$emit('updateHead')
    }

    @State('currentProduct') currentProduct: any
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
                <div class="container">
                    <div class="columns">
                        <div class="column">
                            <v-product-media product={this.currentProduct}></v-product-media>
                        </div>
                        <div class="column">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}