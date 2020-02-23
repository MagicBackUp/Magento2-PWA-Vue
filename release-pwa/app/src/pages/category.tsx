import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'

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
    @Action('getCategoryInfo') getCategoryInfo: any

    public created () {
        this.getCategoryInfo()
    }

    protected render (h: CreateElement) {
        return (
            <div class="v-category">
                Category
            </div>
        )
    }
}