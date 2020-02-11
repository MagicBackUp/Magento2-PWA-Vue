import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component({
    name: 'v-copyright'
})
export default class VCopyright extends Vue {
    @State (state => state.storeConfig) storeConfig: any

    protected render (h: CreateElement) {
        return (
            this.storeConfig && (
                <small class="v-copyright">{this.storeConfig.copyright}</small>
            )
        )
    }
}