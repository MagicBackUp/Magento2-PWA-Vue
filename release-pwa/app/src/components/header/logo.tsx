import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Logo } from '@helper/interface'

@Component({
    name: 'v-logo'
})
export default class VLogo extends Vue {
    @Getter('logo') logo: any

    protected render (h: CreateElement) {
        const logo: Logo = this.logo

        return (
            logo && (
                <a href={logo.href} class="v-logo" title={logo.title}>
                    <img v-lazy={logo.url} alt={logo.title} />
                </a>
            )
        )
    }
}