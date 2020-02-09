import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import VHeader from '@components/header/header'
import VFooter from '@components/footer/footer'

@Component({
    name: 'v-app',
    components: {
        VHeader,
        VFooter
    }
})
export default class VApp extends Vue {
    protected render (h: CreateElement) {
        return (
            <div id="root">
                <v-header></v-header>
                <main class="v-main">
                    <transition name="fade">
                        <router-view></router-view>
                    </transition>
                </main>
                <v-footer></v-footer>
            </div>
        )
    }
}