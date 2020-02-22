import { DirectiveFunction } from 'vue'
import { EventMiddleware, EventHandler } from '../config'

const isTouch: boolean =
  typeof window !== 'undefined' && ('ontouchstart' in window || navigator.msMaxTouchPoints > 0)
const eventHandler: string[] = isTouch ? ['touchstart', 'click'] : ['click']

const instances: any[] = []

const processArgs: Function = (bindingValue: any) => {
    const isFunction = typeof bindingValue === 'function'
    if (!isFunction && typeof bindingValue !== 'object') {
        throw new Error(`v-click-outside: Binding value should be a function or an object, typeof ${bindingValue} given`)
    }

    return {
        handler: isFunction ? bindingValue : bindingValue.handler,
        middleware: bindingValue.middleware || ((isClickOutside: any) => isClickOutside),
        events: bindingValue.events || eventHandler
    }
}

const onEvent: Function = ({ el, event, handler, middleware }: EventMiddleware) => {
    const isClickOutside: boolean = event.target !== el && !el.contains(event.target)

    if (!isClickOutside) {
        return false
    }

    if (middleware(event, el)) {
        handler(event, el)
    }
}

const bind: DirectiveFunction = (el: any, { value }) => {
    const { handler, middleware, events } = processArgs(value)

    const instance = {
        el,
        eventHandlers: events.map((eventName: string) => ({
            event: eventName,
            handler: (event: any) => onEvent({ event, el, handler, middleware })
        }))
    }

    instance.eventHandlers.forEach(({ event, handler }: EventHandler) =>
        document.addEventListener(event, handler))
    instances.push(instance)
}

const update: DirectiveFunction = (el, { value }) => {
    const { handler, middleware, events } = processArgs(value)
    const instance = instances.find((instance) => instance.el === el)

    instance.eventHandlers.forEach(({ event, handler }: EventHandler) =>
        document.removeEventListener(event, handler)
    )

    instance.eventHandlers = events.map((eventName: string) => ({
        event: eventName,
        handler: (event: any) => onEvent({ event, el, handler, middleware })
    }))

    instance.eventHandlers.forEach(({ event, handler }: EventHandler) =>
        document.addEventListener(event, handler))
}

const unbind: DirectiveFunction = (el: any) => {
    const instance = instances.find((instance) => instance.el === el)
    instance.eventHandlers.forEach(({ event, handler }: EventHandler) =>
        document.removeEventListener(event, handler)
    )
}

const clickOutside: any = {
    bind,
    update,
    unbind,
    instances
}

export default clickOutside