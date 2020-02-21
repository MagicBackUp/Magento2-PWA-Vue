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
                <v-logo></v-logo>
                {this.categoryMemu.length > 0 && (
                    <ul class="v-list">
                        {this.categoryMemu.map((menu: CategoryItem) => {
                            return (
                                menu.include_in_menu && (
                                    <li>
                                        <a href={`category/${menu.url_path}`} title={menu.name}>{menu.name}</a>
                                        {menu.children_count > 0 && (
                                            <ul class="v-subcate">
                                                {menu.children.map((item: CategoryItem) => {
                                                    return (
                                                        item.include_in_menu && (
                                                            <li>
                                                                <a href={`category/${item.url_path}`} title={item.name}>{item.name}</a>
                                                            </li>
                                                        )
                                                    )
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                )
                            )
                        })}
                    </ul>
                )}
            </nav>
        )
    }
}