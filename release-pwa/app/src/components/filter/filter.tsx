import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component({
    name: 'v-filters'
})
export default class VFilters extends Vue {
    @State('currentCategory') currentCategory: any

    protected render (h: CreateElement) {
        return (
            this.currentCategory && (
                <div class="v-filters">
                    
                </div>
            )
        )
    }
}