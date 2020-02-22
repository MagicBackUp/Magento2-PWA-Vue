import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { CategoryItem } from '@helper/interface'
import VLogo from './logo'

@Component({
    name: 'v-navigation',
    components: {
        VLogo
    }
})
export default class VNavigation extends Vue {
    @State('categoryMemu') categoryMemu: any

    protected render (h: CreateElement) {
        return (
            <nav class="v-navigation">
                <v-navbar shadow={true}>
                    <template slot="brand">
                        <v-navbar-item tag="router-link" to={{ path: '/' }}>
                            <v-logo></v-logo>
                        </v-navbar-item>
                    </template>
                    {this.categoryMemu.length > 0 && (
                        <template slot="start">
                            {this.categoryMemu.map((menu: CategoryItem) => {
                                return (
                                    menu.include_in_menu && (
                                        menu.children_count > 0 ? (
                                            <v-navbar-dropdown label={menu.name} hoverable={true}>
                                                {menu.children.map((item: CategoryItem) => {
                                                    return (
                                                        menu.include_in_menu && (
                                                            <v-navbar-item tag="router-link" to={`/category/${item.url_path}`} title={item.name}>
                                                                {item.name}
                                                            </v-navbar-item>
                                                        )
                                                    ) 
                                                })}
                                            </v-navbar-dropdown>
                                        ) : (
                                            <v-navbar-item tag="router-link" to={`/category/${menu.url_path}`} title={menu.name}>
                                                {menu.name}
                                            </v-navbar-item>
                                        )
                                    )
                                )
                            })}
                        </template>
                    )}
                    <template slot="end">
                        <v-navbar-item tag="div">
                            <div class="buttons">
                                <v-button tag="router-link" to="/login" type="is-link">Log in</v-button>
                                <v-button tag="router-link" to="/register" type="is-info">Sign up</v-button>
                            </div>
                        </v-navbar-item>
                    </template>
                </v-navbar>
            </nav>
        )
    }
}