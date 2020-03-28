import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import VNavigation from './navigation'

@Component({
    name: 'v-header',
    components: {
        VNavigation
    }
})
export default class VHeader extends Vue {
    protected render (h: CreateElement) {
        return (
            <header class="v-header">
                <v-navigation></v-navigation>
            </header>
        )
    }
}