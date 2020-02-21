import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { Logo } from '@helper/interface'

@Component({
    name: 'v-logo'
})
export default class VLogo extends Vue {
    public logo: Logo = {
        url: '',
        href: '',
        title: ''
    } 

    protected render (h: CreateElement) {
        return (
            <a href={this.logo.href} class="v-logo" title={this.logo.title}>
                <img src={this.logo.url} alt={this.logo.title} />
            </a>
        )
    }
}