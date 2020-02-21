import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-register'
})
export default class VRegister extends Vue {
    protected render (h: CreateElement) {
        return (
            <div class="v-register">
                Register Page
            </div>
        )
    }
}