import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
    name: 'v-filters'
})
export default class VFilters extends Vue {
    @Getter('filter') filter: any

    public i18n: any = {
        shoping: 'Shopping Options'
    }

    protected render (h: CreateElement) {
        const path: string = this.$route.path
        const filter: any[] = this.filter

        return (
            <div class="v-filters">
                <h2 class="title">{this.i18n.shoping}</h2>
                {filter.map((attribute: any) => {
                    return (
                        <article>
                            <div class="in-code">
                                <span>{attribute.name}</span>
                            </div>
                            <div class="in-label">
                                {attribute.filter_items.map((code: any) => {
                                    return (
                                        <router-link tag="a" to={`${path}?${attribute.request_var}:${code.value_string}`} class="in-value" title={code.label}>
                                            <span>{code.label}</span>
                                        </router-link>
                                    )
                                })}
                            </div>
                        </article>
                    )
                })}
            </div>
        )
    }
}