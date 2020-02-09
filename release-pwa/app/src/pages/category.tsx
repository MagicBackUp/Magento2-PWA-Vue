import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-category'
})
export default class VCategory extends Vue {
    protected render (h: CreateElement) {
        return (
            <div class="v-category">
                Category
            </div>
        )
    }
}