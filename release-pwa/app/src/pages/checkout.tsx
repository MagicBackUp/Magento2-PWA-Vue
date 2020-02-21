import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-checkout'
})
export default class VCheckout extends Vue {
    protected render (h: CreateElement) {
        return (
            <div class="v-checkout">
                Checkout Page
            </div>
        )
    }
}