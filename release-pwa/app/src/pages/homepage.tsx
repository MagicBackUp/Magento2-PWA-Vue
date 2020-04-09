import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { VCmsBanner } from '@components/common'

@Component({
    name: 'v-homepage',
    head: {
        title: {
            inner: 'PWA',
            complement: 'Homepage'
        }
    },
    components: {
        VCmsBanner
    }
})
export default class VHomePage extends Vue {
    @State('cmsBanner') cmsBanner: any
    @Action('getBanner') getBanner: any

    private mounted () {
        this.getBanner()
    }
    
    protected render (h: CreateElement) {
        return (
            <div class="v-homepage">
                <div class="container">
                    {this.cmsBanner.length > 0 && (
                        <div class="v-row">
                            <v-cms-banner carousels={this.cmsBanner}></v-cms-banner>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}