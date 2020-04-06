import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component({
    name: 'v-sorter'
})
export default class VSorter extends Vue {
    public activeSorter: any = {}

    @State('productSorter') productSorter: any

    protected render (h: CreateElement) {
        const options: any[] = this.productSorter.options

        return (
            options && options.length > 0 && (
                <v-basic-select options={options} vModel={this.activeSorter} placeholder={this.productSorter.default}></v-basic-select>
            )
        )
    }
}
