import { CreateElement, FunctionalComponentOptions, RenderContext } from 'vue'

interface Image {
    url: string
    title?: string
}

const VImage: FunctionalComponentOptions<Image> = {
    name: 'v-image',
    props: {
        url: String,
        title: String
    },
    functional: true,
    render (h: CreateElement, context: RenderContext<Image>) {
        const { url, title } = context.props

        return (
            <img src={url} class="v-image" alt={title} />
        )
    } 
}

export default VImage