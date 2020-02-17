import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { config, merge, sign } from '../../utils'
import VIcon from '../icon/icon'

@Component({
    name: 'v-carousel-list',
    components: {
        VIcon
    }
})
export default class VCarouselList extends Vue {
    @Prop({ default: () => ({}) }) readonly config: object | any
    @Prop({ default: () => ([]) }) readonly data: any[] = []
    @Prop({ default: 0 }) readonly value: number | undefined
    @Prop({ default: true }) readonly hasDrag: boolean | undefined
    @Prop(Boolean) readonly hasGrayscale: boolean | undefined
    @Prop(Boolean) readonly hasOpacity: boolean | undefined
    @Prop(Boolean) readonly repeat: boolean | undefined
    @Prop({ default: 4 }) readonly itemsToShow: number | undefined
    @Prop({ default: 1 }) readonly itemsToList: number | any
    @Prop(Boolean) readonly asIndicator: boolean | undefined
    @Prop({ default: true }) readonly arrow: boolean | undefined
    @Prop({ default: true }) readonly arrowHover: boolean | undefined
    @Prop(String) readonly iconPack: string | undefined
    @Prop(String) readonly iconSize: string | undefined
    @Prop({ default: config.defaultIconPrev }) readonly iconPrev: string | undefined
    @Prop({ default: config.defaultIconNext }) readonly iconNext: string | undefined
    @Prop(Boolean) readonly refresh: boolean | undefined

    @Watch('value')
    onValueChanged(value: any) {
        this.switchTo(value)
    }
    @Watch('refresh')
    onRefreshChanged(status: string) {
        if (status && this.asIndicator) {
            this.getWidth()
        }
    }

    public activeItem: any = this.value
    public breakpoints: any = {}
    public delta: number = 0
    public dragging: boolean = false
    public hold: number = 0
    public itemWidth: number = 0
    public total: number = 0
    public settings: any = {}

    private get listClass () {
        return [
            {
                'has-grayscale': this.settings.hasGrayscale || this.hasGrayscale,
                'has-opacity': this.settings.hasOpacity || this.hasOpacity,
                'is-dragging': this.dragging
            }
        ]
    }

    private get itemStyle () {
        return `width: ${this.itemWidth}px;`
    }

    private get transformStyle () {
        const translate = this.delta + 1 * (this.activeItem * this.itemWidth)
        const result = this.dragging ? -translate : -Math.abs(translate)
        return `transform: translateX(${result}px);`
    }

    public created () {
        this.initConfig()
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.update)
        }
    }

    public mounted() {
        this.total = this.data.length - 1
        this.$nextTick(() => {
            this.update()
        })
    }

    public beforeDestroy () {
        window.removeEventListener('resize', this.update)
    }

    public initConfig () {
        this.breakpoints = this.config.breakpoints
        this.settings = merge(this.$props, this.config, true)
    }

    public getWidth () {
        const rect = this.$el.getBoundingClientRect()
        this.itemWidth = rect.width / this.settings.itemsToShow
    }

    public update () {
        if (this.breakpoints) {
            this.updateConfig()
        }
        this.getWidth()
    }
    public updateConfig() {
        const breakpoints: any[] = Object.keys(this.breakpoints).sort((a: any, b: any) => b - a)
        let checking: any
        breakpoints.some((breakpoint) => {
            checking = window.matchMedia(`(min-width: ${breakpoint}px)`).matches
            if (checking) {
                this.settings = this.config.breakpoints[breakpoint]
                return true
            }
        })
        if (!checking) {
            this.settings = this.config
        }
    }

    public switchTo (newIndex: number) {
        if (newIndex < 0 ||
            this.activeItem === newIndex ||
            (!this.repeat && newIndex > this.total)) return
        const result = this.repeat && newIndex > this.total ? 0 : newIndex
        this.activeItem = result
        this.$emit('switch', result)
    }

    public next (e: Event) {
        e.preventDefault()
        this.switchTo(this.activeItem + this.itemsToList)
    }

    public prev (e: Event) {
        e.preventDefault()
        this.switchTo(this.activeItem - this.itemsToList)
    }

    public checkArrow (value: any) {
        if (this.repeat || this.activeItem !== value) return true
    }

    public checkAsIndicator (value: number, e: any) {
        e.preventDefault()
        if (!this.asIndicator) return
        const timeCheck = new Date().getTime()
        if (!e.touches && (timeCheck - this.hold) > 200) return
        this.switchTo(value)
    }

    public dragStart (event: any) {
        event.stopPropagation()
        event.preventDefault()
        if (!this.hasDrag || (event.button !== 0 && event.type !== 'touchstart')) return
        this.hold = new Date().getTime()
        this.dragging = true
        this.dragStartX = event.touches ? event.touches[0].clientX : event.clientX
        window.addEventListener(event.touches ? 'touchmove' : 'mousemove', this.dragMove)
        window.addEventListener(event.touches ? 'touchend' : 'mouseup', this.dragEnd)
    }

    public dragMove (event: any) {
        this.dragEndX = event.touches ? event.touches[0].clientX : event.clientX
        const deltaX = this.dragEndX - this.dragStartX
        this.delta = deltaX < 0 ? Math.abs(deltaX) : -Math.abs(deltaX)
        if (!event.touches) {
            event.preventDefault()
        }
    }

    public dragEnd (event: any) {
        const signCheck: any = 1 * sign(this.delta)
        const results: number = Math.round(Math.abs(this.delta / this.itemWidth) + 0.15)
        this.switchTo(this.activeItem + signCheck * results)
        this.dragging = false
        this.delta = 0
        window.removeEventListener(event.touches ? 'touchmove' : 'mousemove', this.dragMove)
        window.removeEventListener(event.touches ? 'touchend' : 'mouseup', this.dragEnd)
    }

    protected render (h: CreateElement) {
        return (
            <div
                class={['carousel-list', {'has-shadow': this.activeItem > 0}]}
                onMousedown={(e: Event) => { this.dragStart(e) }}
                onTouchstart={(e: Event) => { this.dragStart(e) }}>
                <div class={['carousel-slides', this.listClass]} style={this.transformStyle}>
                    {this.data.map((list: any, index: number) => {
                        return (
                            <div
                                class={['carousel-slide', {'is-active': this.activeItem === this.index}]}
                                style={this.itemStyle}
                                onClick={(e: Event) => { this.checkAsIndicator(index, e) }}>
                                <slot
                                    list={list}
                                    index={index}
                                    active={this.activeItem}
                                    name="item">
                                    <figure class="image">
                                        <img src={list.image}  title={list.title} />
                                    </figure>
                                </slot>
                            </div>
                        )
                    })}
                </div>
                {this.arrow && (
                    <div class={['carousel-arrow', {'is-hovered': this.arrowHover}]}>
                       <v-icon
                            class="has-icons-left"
                            style={[{'display': this.activeItem > 0 ? 'block': 'none' }]}
                            pack={this.iconPack}
                            icon={this.iconPrev}
                            size={this.iconSize}
                            both={true}
                            onNativeClick={(e: Event) => { this.prev(e) }}></v-icon>
                        <v-icon
                            class="has-icons-right"
                            style={[{'display': this.checkArrow(this.total) ? 'block': 'none' }]}
                            pack={this.iconPack}
                            icon={this.iconPrev}
                            size={this.iconSize}
                            both={true}
                            onNativeClick={(e: Event) => { this.next(e) }}></v-icon>
                    </div>
                )}
            </div>
        )
    }
}