import { DirectiveFunction } from 'vue'

let onKeyDown: Function = () => {}

const findFocusable: Function = (element: any) => {
    if (!element) {
        return null
    }

    return element.querySelectorAll(
        `a[href],
        area[href],
        input:not([disabled]),
        select:not([disabled]),
        textarea:not([disabled]),
        button:not([disabled]),
        iframe,
        object,
        embed,
        *[tabindex],
        *[contenteditable]`
    )
}

const bind: DirectiveFunction = (el: any, { value = true }) => {
    if (value) {
        const focusable = findFocusable(el)

        if (focusable && focusable.length > 0) {
            const firstFocusable = focusable[0]
            const lastFocusable = focusable[focusable.length - 1]

            onKeyDown = (event: any) => {
                if (event.target === firstFocusable && event.shiftKey && event.key === 'Tab') {
                    event.preventDefault()
                    lastFocusable.focus()
                } else if (event.target === lastFocusable && !event.shiftKey && event.key === 'Tab') {
                    event.preventDefault()
                    firstFocusable.focus()
                }
            }
            el.addEventListener('keydown', onKeyDown)
        }
    }
}

const unbind: DirectiveFunction = (el: any) => {
    el.removeEventListener('keydown', onKeyDown)
}

const trapFocus: any = {
    bind,
    unbind
}

export default trapFocus