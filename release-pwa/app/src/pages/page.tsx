import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { Route } from 'vue-router'
import VCms from '@components/cms/page'

@Component({
    name: 'v-page',
    head: {
        title: {
            inner: 'PWA',
            complement: 'Page'
        }
    },
    components: {
        VCms
    }
})
export default class VPage extends Vue {
    @Action('getCmsPage') getCmsPage: any

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
                <v-cms></v-cms>
            </div>
        )
    }
}