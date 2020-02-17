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
    private carousels: any[] = [
        { text: 'Slide 1', color: 'primary' },
        { text: 'Slide 2', color: 'info' },
        { text: 'Slide 3', color: 'success' },
        { text: 'Slide 4', color: 'warning' },
        { text: 'Slide 5', color: 'danger' }
    ]
    
    protected render (h: CreateElement) {
        return (
            <div class="v-homepage">
                <div class="v-row">
                    <v-icon></v-icon>
                    <v-button tag="router-link" to="/category" type="is-link">Category</v-button>
                </div>
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
                    <v-carousel>
                        {this.carousels.map((carousel: any) => {
                            return (
                                <v-carousel-item>
                                    <section class={`hero is-medium is-${carousel.color}`}>
                                        <div class="hero-body has-text-centered">
                                            <h1 class="title">{carousel.text}</h1>
                                        </div>
                                    </section>
                                </v-carousel-item>
                            )
                        })}
                    </v-carousel>
                </div>
                <div class="v-row">
                    <v-progress value={60} show-value={true} format="percent"></v-progress>
                </div>
            </div>
        )
    }
}