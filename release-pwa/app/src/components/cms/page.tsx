import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
    name: 'v-cms'
})
export default class VCms extends Vue {
    @Getter('cmsContent') cmsContent: any

    protected render (h: CreateElement) {
        return (
            this.cmsContent && (
                <div class="v-cms" domPropsInnerHTML={this.cmsContent}></div>
            )
        )
    }
}