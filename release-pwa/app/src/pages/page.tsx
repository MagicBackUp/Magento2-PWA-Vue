import Vue, { CreateElement } from 'vue'
import { Route } from 'vue-router'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-page',
    head: {
        title: {
            inner: 'PWA',
            complement: 'Page'
        }
    }
})
export default class VPage extends Vue {
    public beforeRouteEnter (to: Route, from: Route, next: Function) {
        next((vm: Vue) => {
            vm.getCmsPage()
        })
    }
    
    public beforeRouteUpdate (to: Route, from: Route, next: Function) {
        next((vm: Vue) => {
            vm.getCmsPage()
        })
    }

    protected render (h: CreateElement) {
        return (
            <div class="v-page">
                Cms Page
            </div>
        )
    }
}