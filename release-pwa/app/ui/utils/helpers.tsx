const signPoly: Function = (value: number) => {
    if (value < 0) return -1
    return value > 0 ? 1 : 0
}

export const sign = Math.sign || signPoly

export const getValueByPath: Function = (obj: any, path: string) => {
    const value: any = path.split('.').reduce((o, i) => o ? o[i] : null, obj)
    return value
}

export const indexOf: Function = (array: any[], obj: any, fn: any) => {
    if (!array) return -1

    if (!fn || typeof fn !== 'function') return array.indexOf(obj)

    for (let i = 0; i < array.length; i++) {
        if (fn(array[i], obj)) {
            return i
        }
    }

    return -1
}

const isObject: Function = (item: any) => typeof item === 'object' && !Array.isArray(item)
const mergeFn: Function = (target: any, source: any, deep: boolean = false) => {
    if (deep || !Object.assign) {
        const isDeep: Function = (prop: any) => isObject(source[prop]) && target !== null && target.hasOwnProperty(prop) && isObject(target[prop])
        const replaced: any = Object.getOwnPropertyNames(source)
            .map((prop) => ({ [prop]: isDeep(prop)
                ? mergeFn(target[prop], source[prop], deep)
                : source[prop] }))
            .reduce((a, b) => ({ ...a, ...b }), {})

        return {
            ...target,
            ...replaced
        }
    } else {
        return Object.assign(target, source)
    }
}
export const merge = mergeFn

export const isMobile: any = {
    Android: () => {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/Android/i)
        )
    },
    BlackBerry: () => {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/BlackBerry/i)
        )
    },
    iOS: () => {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/iPhone|iPad|iPod/i)
        )
    },
    Opera: () => {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/Opera Mini/i)
        )
    },
    Windows: () => {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/IEMobile/i)
        )
    },
    any: () => {
        return (
            isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()
        )
    }
}

export const removeElement: Function = (el: HTMLElement) => {
    if (typeof el.remove !== 'undefined') {
        el.remove()
    } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
        el.parentNode.removeChild(el)
    }
}

export const escapeRegExpChars: Function = (value: string) => {
    if (!value) return value

    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
}