import Vue, { CreateElement } from 'vue'
import { Route } from 'vue-router'
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

    public beforeRouteEnter (to: Route, from: Route, next: Function) {
        next((vm: Vue) => {
            vm.getCategoryInfo()
        })
    }
    
    public beforeRouteUpdate (to: Route, from: Route, next: Function) {
        this.getCategoryInfo()
        next()
    }

    protected render (h: CreateElement) {
        return (
            <div class="v-category">
                Category
            </div>
        )
    }
}