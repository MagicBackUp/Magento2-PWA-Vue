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
    private name: string = ''

    protected render (h: CreateElement) {
        return (
            <nav class="v-navigation">
                <v-logo></v-logo>
                <v-icon></v-icon>
                <v-input vModel={this.name} password-reveal={true}></v-input>
            </nav>
        )
    }
}