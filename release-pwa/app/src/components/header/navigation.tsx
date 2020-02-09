import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import VLogo from './logo'

@Component({
    name: 'v-navigation',
    components: {
        VLogo
    }
})
export default class VNavigation extends Vue {
    protected render (h: CreateElement) {
        return (
            <nav class="v-navigation">
                <v-logo></v-logo>
            </nav>
        )
    }
}