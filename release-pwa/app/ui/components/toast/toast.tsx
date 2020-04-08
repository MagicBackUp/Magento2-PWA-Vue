import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { config, VNoticeMixin } from '../../utils'

@Component({
    name: 'v-toast',
    inheritAttrs: false,
    mixins: [VNoticeMixin]
})
export default class VToast extends Vue {
    public newDuration: number = this.duration || config.defaultToastDuration

    protected render (h: CreateElement) {
        return (
            <transition
                enter-active-class={this.transition.enter}
                leave-active-class={this.transition.leave}>
                {this.isActive && (
                    <div
                        class={['toast', this.type, this.position]}
                        aria-hidden={!this.isActive}
                        role="alert">
                        <div domPropsInnerHTML={this.message}></div>
                    </div>
                )}
            </transition>
        )
    }
}