import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-category',
    head: {
        title: {
            inner: 'PWA',
            complement: 'Category'
        }
    }
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