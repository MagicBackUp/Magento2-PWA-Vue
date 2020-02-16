import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-carousel-item'
})
export default class VCarouselItem extends Vue {
    public isActive: boolean = false
    public transitionName: string = ''

    private get transition () {
        return this.$parent.animated === 'fade' ? 'fade' : this.transitionName
    }

    public created () {
        if (!this.$parent.$data._isCarousel) {
            this.$destroy()
            throw new Error('You should wrap VCarouselItem on a VCarousel')
        }
        this.$parent.carouselItems.push(this)
    }

    public beforeDestroy () {
        const index: number = this.$parent.carouselItems.indexOf(this)
        if (index >= 0) {
            this.$parent.carouselItems.splice(index, 1)
        }
    }

    public status (value: boolean, action: string) {
        this.transitionName = action ? 'slide-next' : 'slide-prev'
        this.isActive = value
    }

    protected render (h: CreateElement) {
        return (
            <transition name={this.transition}>
                {this.isActive && (
                    <div class="carousel-item">{this.$slots.default}</div>
                )}
            </transition>
        )
    }
}