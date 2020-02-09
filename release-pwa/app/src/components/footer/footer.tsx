import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-footer'
})
export default class VFooter extends Vue {
    protected render (h: CreateElement) {
        return (
            <footer class="v-footer">

            </footer>
        )
    }
}