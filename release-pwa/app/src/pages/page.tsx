import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-page'
})
export default class VPage extends Vue {
    protected render (h: CreateElement) {
        return (
            <div class="v-page">
                Cms Page
            </div>
        )
    }
}