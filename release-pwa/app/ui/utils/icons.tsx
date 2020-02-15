import config from './config'
import { merge } from './helpers'

const mdiIcons: any = {
    sizes: {
        'default': 'mdi-24px',
        'is-small': null,
        'is-medium': 'mdi-36px',
        'is-large': 'mdi-48px'
    },
    iconPrefix: 'mdi-'
}

const faIcons: Function = () => {
    const faIconPrefix: string = config && config.defaultIconComponent ? '' : 'fa-'
    
    return {
        sizes: {
            'default': faIconPrefix + 'lg',
            'is-small': null,
            'is-medium': faIconPrefix + '2x',
            'is-large': faIconPrefix + '3x'
        },
        iconPrefix: faIconPrefix,
        internalIcons: {
            'information': 'info-circle',
            'alert': 'exclamation-triangle',
            'alert-circle': 'exclamation-circle',
            'chevron-right': 'angle-right',
            'chevron-left': 'angle-left',
            'chevron-down': 'angle-down',
            'eye-off': 'eye-slash',
            'menu-down': 'caret-down',
            'menu-up': 'caret-up',
            'close-circle': 'times-circle'
        }
    }
}

const getIcons: Function = () => {
    let icons: any = {
        mdi: mdiIcons,
        fa: faIcons(),
        fas: faIcons(),
        far: faIcons(),
        fad: faIcons(),
        fab: faIcons(),
        fal: faIcons()
    }

    if (config && config.customIconPacks) {
        icons = merge(icons, config.customIconPacks, true)
    }

    return icons
}

export default getIcons