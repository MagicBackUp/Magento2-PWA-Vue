import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { Route } from 'vue-router'

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
    @Watch('cmsPage')
    onCmsPageChanged(page: any) {
        this.$emit('updateHead')
    }

    @State('cmsPage') cmsPage: any
    @Action('getCmsPage') getCmsPage: any

    public beforeRouteEnter (to: Route, from: Route, next: Function) {
        next((vm: Vue) => {
            vm.getCmsPage()
        })
    }
    
    public beforeRouteUpdate (to: Route, from: Route, next: Function) {
        next()
        this.getCmsPage()
    }

    protected render (h: CreateElement) {
        return (
            <div class="v-page">
                {this.cmsPage && (
                    <div class="v-cms" domPropsInnerHTML={this.cmsPage.content}></div>
                )}
            </div>
        )
    }
}