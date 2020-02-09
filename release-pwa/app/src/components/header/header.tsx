import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import VNavigation from './navigation'

@Component({
    name: 'v-header',
    components: {
        VNavigation
    }
})
export default class VHeader extends Vue {
    @Action('getStoreConfig') getStoreConfig: any
    
    created () {
        this.getStoreConfig()
    }

    protected render (h: CreateElement) {
        return (
            <header class="v-header">
                <v-navigation></v-navigation>
            </header>
        )
    }
}