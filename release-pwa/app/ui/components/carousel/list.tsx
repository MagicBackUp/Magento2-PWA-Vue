import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { config, merge, sign } from '../../utils'
import VIcon from '../icon/Icon'

@Component({
    name: 'v-carousel-list',
    components: {
        VIcon
    }
})
export default class VCarouselList extends Vue {
    @Prop({ default: () => ({}) }) readonly config: object | undefined
    @Prop({ default: () => ([]) }) readonly data: any[] | undefined
    @Prop({ default: 0 }) readonly value: number | undefined
    @Prop({ default: true }) readonly hasDrag: boolean | undefined
    @Prop(Boolean) readonly hasGrayscale: boolean | undefined
    @Prop(Boolean) readonly hasOpacity: boolean | undefined
    @Prop(Boolean) readonly repeat: boolean | undefined
    @Prop({ default: 4 }) readonly itemsToShow: number | undefined
    @Prop({ default: 1 }) readonly itemsToList: number | undefined
    @Prop(Boolean) readonly asIndicator: boolean | undefined
    @Prop({ default: true }) readonly arrow: boolean | undefined
    @Prop({ default: true }) readonly arrowHover: boolean | undefined
    @Prop(String) readonly iconPack: string | undefined
    @Prop(String) readonly iconSize: string | undefined
    @Prop({ default: config.defaultIconPrev }) readonly iconPrev: string | undefined
    @Prop({ default: config.defaultIconNext }) readonly iconNext: string | undefined
    @Prop(Boolean) readonly refresh: boolean | undefined

    public activeItem: any = this.value
    public breakpoints: any = {}
    public delta: number = 0
    public dragging: boolean = false
    public hold: number = 0
    public itemWidth: number = 0
    public total: number = 0
    public settings: any = {}
}