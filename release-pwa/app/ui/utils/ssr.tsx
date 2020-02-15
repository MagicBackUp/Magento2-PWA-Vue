export const isSSR: boolean = typeof window === 'undefined'
export const HTMLElement: any = isSSR ? Object : window.HTMLElement
export const File: any = isSSR ? Object : window.File