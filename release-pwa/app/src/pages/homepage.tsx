import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-homepage'
})
export default class VHomePage extends Vue {
    protected render (h: CreateElement) {
        return (
            <div class="v-homepage">
                HomePage
            </div>
        )
    }
}