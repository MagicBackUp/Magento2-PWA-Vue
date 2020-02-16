import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import VIcon from '../icon/Icon'
import config from '../../utils/config'

@Component({
    name: 'v-button',
    components: {
        VIcon
    }
})
export default class VButton extends Vue {
    protected render (h: CreateElement) {
        return (
            <component
                :is="computedTag"
                class="button"
                v-bind="$attrs"
                :type="nativeType"
                :class="[size, type, {
                    'is-rounded': rounded,
                    'is-loading': loading,
                    'is-outlined': outlined,
                    'is-fullwidth': expanded,
                    'is-inverted': inverted,
                    'is-focused': focused,
                    'is-active': active,
                    'is-hovered': hovered,
                    'is-selected': selected
                }]"
                v-on="$listeners"
            >
                <b-icon
                    v-if="iconLeft"
                    :pack="iconPack"
                    :icon="iconLeft"
                    :size="iconSize"
                />
                <span v-if="label">{{ label }}</span>
                <span v-else-if="hasDefaultSlot">{this.$slots.default}</span>
                <b-icon
                    v-if="iconRight"
                    :pack="iconPack"
                    :icon="iconRight"
                    :size="iconSize"
                />
            </component>
        )
    }
}