import { CreateElement, FunctionalComponentOptions, RenderContext } from 'vue'
import { connector } from '@store/index'

interface BannerOptions {
    carousels: any[]
    storeConfig: any
}

const VCmsBanner: FunctionalComponentOptions<BannerOptions> = {
    name: 'v-cms-banner',
    props: {
        carousels: {
            type: Array,
            default: []
        },
        storeConfig: {
            type: Object
        }
    },
    functional: true,
    render (h: CreateElement, context: RenderContext<BannerOptions>) {
        const { carousels, storeConfig } = context.props
        const baseUrl: string = storeConfig.base_media_url

        const filterImg: Function = (url: string) => {
            return `${baseUrl}${url}`
        }

        return (
            <v-carousel>
                {carousels.map((carousel: any) => {
                    return (
                        <v-carousel-item>
                            <a href={carousel.url} title={carousel.title}>
                                <img src={filterImg(carousel.image)} alt={carousel.image_alt} />
                            </a>
                        </v-carousel-item>
                    )
                })}
            </v-carousel>
        )
    } 
}

export default connector.connect({
    mapStateToProps: {
        storeConfig: (state: any) => state.storeConfig
    }
})(VCmsBanner)