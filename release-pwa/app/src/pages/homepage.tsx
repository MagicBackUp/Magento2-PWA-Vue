import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-homepage'
})
export default class VHomePage extends Vue {
    private name: string = ''
    
    protected render (h: CreateElement) {
        return (
            <div class="v-homepage">
                <v-icon></v-icon>
                <v-input vModel={this.name} password-reveal={true}></v-input>
            </div>
        )
    }
}