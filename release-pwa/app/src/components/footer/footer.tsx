import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import VLinks from './links'
import VCopyright from './copyright'

@Component({
    name: 'v-footer',
    components: {
        VLinks,
        VCopyright
    }
})
export default class VFooter extends Vue {
    protected render (h: CreateElement) {
        return (
            <footer class="v-footer">
                <div class="v-container">
                    <v-links></v-links>
                    <v-copyright></v-copyright>
                </div>
            </footer>
        )
    }
}