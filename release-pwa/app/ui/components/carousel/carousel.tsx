import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { config } from '../../utils'
import VIcon from '../icon/icon'

@Component({
    name: 'v-carousel',
    components: {
        VIcon
    }
})
export default class VCarousel extends Vue {
    @Prop({ default: 0 }) readonly value: number | undefined
    @Prop({ default: 'slide' }) readonly animated: string | undefined
    @Prop(Number) readonly interval: number | undefined
    @Prop({ default: true }) readonly hasDrag: boolean | undefined
    @Prop({ default: true }) readonly autoplay: boolean | undefined
    @Prop({ default: true }) readonly pauseHover: boolean | undefined
    @Prop({ default: true }) readonly pauseInfo: boolean | undefined
    @Prop({ default: 'is-white' }) readonly pauseInfoType: string | undefined
    @Prop({ default: 'Pause' }) readonly pauseText: string | undefined
    @Prop({ default: true }) readonly arrow: boolean | undefined
    @Prop({ default: true }) readonly arrowBoth: boolean | undefined
    @Prop({ default: true }) readonly arrowHover: boolean | undefined
    @Prop({ default: true }) readonly repeat: boolean | undefined
    @Prop(String) readonly iconPack: string | undefined
    @Prop(String) readonly iconSize: string | undefined
    @Prop({ default: config.defaultIconPrev }) readonly iconPrev: string | undefined
    @Prop({ default: config.defaultIconNext }) readonly iconNext: string | undefined
    @Prop({ default: true }) readonly indicator: boolean | undefined
    @Prop(Boolean) readonly indicatorBackground: boolean | undefined
    @Prop(Boolean) readonly indicatorCustom: boolean | undefined
    @Prop({ default: 'is-small' }) readonly indicatorCustomSize: string | undefined
    @Prop({ default: true }) readonly indicatorInside: boolean | undefined
    @Prop({ default: 'click' }) readonly indicatorMode: string | undefined
    @Prop({ default: 'is-bottom' }) readonly indicatorPosition: string | undefined
    @Prop({ default: 'is-dots' }) readonly indicatorStyle: string | undefined
    @Prop(Boolean) readonly overlay: boolean | undefined
    @Prop(Boolean) readonly progress: boolean | undefined
    @Prop({ default: 'is-primary' }) readonly progressType: string | undefined
    @Prop(Boolean) readonly withCarouselList: boolean | undefined

    @Watch('value')
    onValueChanged (value: any) {
        if (value < this.activeItem) {
            this.changeItem(value)
        } else {
            this.changeItem(value, false)
        }
    }
    @Watch('carouselItems')
    onCarouselItemsChanged () {
        if (this.activeItem < this.carouselItems.length) {
            this.carouselItems[this.activeItem].isActive = true
        }
    }
    @Watch('autoplay')
    onAutoplayChanged (status: string) {
        status ? this.startTimer() : this.pauseTimer()
    }

    public _isCarousel: boolean = true
    public activeItem: any = this.value
    public carouselItems: any[] = []
    public isPause: boolean = false
    public dragX: number = 0
    public timer: any = null

    private get indicatorClasses () {
        return [
            {
                'has-background': this.indicatorBackground,
                'has-custom': this.indicatorCustom,
                'is-inside': this.indicatorInside
            },
            this.indicatorCustom && this.indicatorCustomSize,
            this.indicatorInside && this.indicatorPosition
        ]
    }

    public mounted () {
        if (this.activeItem < this.carouselItems.length) {
            this.carouselItems[this.activeItem].isActive = true
        }
        this.startTimer()
    }

    public beforeDestroy () {
        this.pauseTimer()
    }

    public startTimer () {
        if (!this.autoplay || this.timer) return false
        this.isPause = false
        this.timer = setInterval(() => {
            if (!this.repeat && this.activeItem === this.carouselItems.length - 1) {
                this.pauseTimer()
            } else {
                this.next()
            }
        }, (this.interval || config.defaultCarouselInterval))
    }

    public pauseTimer () {
        this.isPause = true
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = null
        }
    }

    public checkPause () {
        if (this.pauseHover && this.autoplay) {
            return this.pauseTimer()
        }
    }

    public changeItem (newIndex: number, action: boolean = true) {
        if (this.activeItem === newIndex) return false
        if (this.activeItem < this.carouselItems.length) {
            this.carouselItems[this.activeItem].status(false, action)
        }
        this.carouselItems[newIndex].status(true, action)
        this.activeItem = newIndex
        this.$emit('change', newIndex)
    }

    public modeChange (trigger: string, value: number) {
        if (this.indicatorMode === trigger) {
            this.$emit('input', value)
            return value < this.activeItem
                ? this.changeItem(value)
                : this.changeItem(value, false)
        }
    }

    public prev (e?: Event) {
        e && e.preventDefault()
        if (this.activeItem === 0) {
            if (this.repeat) this.changeItem(this.carouselItems.length - 1)
        } else {
            this.changeItem(this.activeItem - 1)
        }
    }

    public next (e?: Event) {
        e && e.preventDefault()
        if (this.activeItem === this.carouselItems.length - 1) {
            if (this.repeat) this.changeItem(0, false)
        } else {
            this.changeItem(this.activeItem + 1, false)
        }
    }

    public checkArrow (value: any) {
        if (this.arrowBoth) return true
        if (this.activeItem !== value) return true
    }

    public dragStart (event: any) {
        event.stopPropagation()
        if (!this.hasDrag) return false
        this.dragx = event.touches ? event.changedTouches[0].pageX : event.pageX
        if (event.touches) {
            this.pauseTimer()
        } else {
            event.preventDefault()
        }
    }

    public dragEnd (event: any) {
        event.stopPropagation()
        if (!this.hasDrag) return false
        const detected = event.touches ? event.changedTouches[0].pageX : event.pageX
        const diffX = detected - this.dragx
        if (Math.abs(diffX) > 50) {
            if (diffX < 0) {
                this.next()
            } else {
                this.prev()
            }
        }
        if (event.touches) {
            this.startTimer()
        }
    }

    protected render (h: CreateElement) {
        return (
            <div
                class={['carousel', {'is-overlay': this.overlay}]}
                onMouseenter={() => { this.pauseTimer() }}
                onMouseleave={() => { this.startTimer() }}>
                <div
                    class="carousel-items"
                    onMousedown={(e: Event) => { this.dragStart(e) }}
                    onMouseup={(e: Event) => { this.dragEnd(e) }}
                    onTouchstart={(e: Event) => { this.dragStart(e) }}
                    onTouchend={(e: Event) => { this.dragEnd(e) }}>
                    {this.$slots.default}
                    {this.arrow && (
                        <div class={['carousel-arrow', {'is-hovered': this.arrowHover}]}>
                            {this.checkArrow(0) && (
                                <v-icon
                                    class="has-icons-left"
                                    pack={this.iconPack}
                                    icon={this.iconPrev}
                                    size={this.iconSize}
                                    both={true}
                                    onNativeClick={(e: Event) => { this.prev(e) }}
                                ></v-icon>
                            )}
                            {this.checkArrow(this.carouselItems.length - 1) && (
                                <v-icon
                                    class="has-icons-right"
                                    pack={this.iconPack}
                                    icon={this.iconPrev}
                                    size={this.iconSize}
                                    both={true}
                                    onNativeClick={(e: Event) => { this.next(e) }}
                                ></v-icon>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}