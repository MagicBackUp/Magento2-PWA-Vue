export interface EventMiddleware {
    el: any
    event: any
    handler: any
    middleware: any
}

export interface EventHandler {
    event: any
    handler: any
}

export const isFilled: Function = (str: any) => !!str
export const FIXED_TOP_CLASS: string = 'is-fixed-top'
export const BODY_FIXED_TOP_CLASS: string = 'has-navbar-fixed-top'
export const BODY_SPACED_FIXED_TOP_CLASS: string = 'has-spaced-navbar-fixed-top'
export const FIXED_BOTTOM_CLASS: string = 'is-fixed-bottom'
export const BODY_FIXED_BOTTOM_CLASS: string = 'has-navbar-fixed-bottom'
export const BODY_SPACED_FIXED_BOTTOM_CLASS: string = 'has-spaced-navbar-fixed-bottom'