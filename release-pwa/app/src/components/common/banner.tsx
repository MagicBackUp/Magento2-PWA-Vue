import { CreateElement, FunctionalComponentOptions, RenderContext } from 'vue'

interface BannerOptions {
    carousels: any[]
}

const VCmsBanner: FunctionalComponentOptions<BannerOptions> = {
    name: 'v-cms-banner',
    props: {
        carousels: Array
    },
    functional: true,
    render (h: CreateElement, context: RenderContext<BannerOptions>) {
        const { carousels } = context.props

        return (
            <v-carousel>
                {carousels.map((carousel: any) => {
                    return (
                        <v-carousel-item>
                            <a href={carousel.url} title={carousel.title}>
                                <img src={carousel.image} alt={carousel.image_alt} />
                            </a>
                        </v-carousel-item>
                    )
                })}
            </v-carousel>
        )
    } 
}

export default VCmsBanner