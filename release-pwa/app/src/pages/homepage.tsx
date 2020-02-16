import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-homepage'
})
export default class VHomePage extends Vue {
    private name: string = ''
    private method: number = 0
    private checkbox: string = 'Yes'
    
    protected render (h: CreateElement) {
        return (
            <div class="v-homepage">
                <v-icon></v-icon>
                <v-input vModel={this.name} password-reveal={true}></v-input>
                <v-radio name="name" vModel={this.method} native-value={0}></v-radio>
                <v-radio name="name" vModel={this.method} native-value={1}></v-radio>
                <v-checkbox name="checkbox" vModel={this.checkbox} true-value={'Yes'} false-value={'No'}>{this.checkbox}</v-checkbox>
            </div>
        )
    }
}