import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component({
    name: 'v-products-list'
})
export default class VProductsList extends Vue {
    @State('currentCategory') currentCategory: any

    protected render (h: CreateElement) {
        return (
            this.currentCategory && (
                <div class="v-produts-list">
                    Product
                </div>
            )
        )
    }
}