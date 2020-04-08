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
    @State('cart') cart: any

    protected render (h: CreateElement) {
        return (
            <v-navbar shadow={true} fixedTop={true}>
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
                                        <v-navbar-dropdown tag="router-link" label={menu.name} hoverable={true} to={`/category/${menu.url_path}`}>
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
                        <v-icon icon="account" size="is-small"></v-icon>
                        <router-link tag="a" to={`/cart`} class="in-cart-link">
                            <v-icon icon="cart" size="is-small"></v-icon>
                            {this.cart && this.cart.total_quantity > 0 && (
                                <span>{this.cart.total_quantity}</span>
                            )}
                        </router-link>
                    </v-navbar-item>
                </template>
            </v-navbar>
        )
    }
}