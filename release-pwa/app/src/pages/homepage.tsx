import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-homepage'
})
export default class VHomePage extends Vue {
    private name: string = ''
    private method: number = 0
    private checkbox: string = 'Yes'
    private switch: string = 'On'
    
    protected render (h: CreateElement) {
        return (
            <div class="v-homepage">
                <v-icon></v-icon>
                <div class="v-row">
                    <v-input vModel={this.name} password-reveal={true}></v-input>
                </div>
                <div class="v-row">
                    <v-radio name="name" vModel={this.method} native-value={0}></v-radio>
                    <v-radio name="name" vModel={this.method} native-value={1}></v-radio>
                </div>
                <div class="v-row">
                    <v-checkbox name="checkbox" vModel={this.checkbox} true-value={'Yes'} false-value={'No'}>{this.checkbox}</v-checkbox>
                </div>
                <div class="v-row">
                    <v-switch name="switch" vModel={this.switch} true-value={'On'} false-value={'Off'}>{this.switch}</v-switch>
                </div>
                <div class="v-row">
                    
                </div>
            </div>
        )
    }
}