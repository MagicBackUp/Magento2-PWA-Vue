import { API } from '@helper/interface'

let mainPromise: any = null

export default class APILoader {
    private protocol: string = ''
    private config: API = {}

    constructor (api: API) {
        const { key, protocol } = api
        this.config = { ...api }

        if (typeof window !== 'undefined') {
            if (key) {
                this.config.key = key
            } else {
                this.config.key = window.key
            }
        }

        this.protocol = protocol || window.location.protocol
        if (this.protocol.indexOf(':') === -1) this.protocol += ':'
    }

    getScriptSrc (config: API) {
        return `${this.protocol}//${config.host}/${config.url}`
    }
    
    buildScriptTag (src: string) {
        const script: HTMLElementTagNameMap['script'] = document.createElement('script')

        script.src = src
        script.type = 'text/javascript'
        script.async = this.config.async || true
        script.defer = this.config.defer || true

        return script
    }
    
    getMainPromise () {
        if (window.key) {
            return Promise.resolve()
        }

        const script: HTMLElementTagNameMap['script'] = this.buildScriptTag(this.getScriptSrc(this.config))
        const p: any = new Promise((resolve: any) => {
            script.onload = () => {
                if (this.config.callback)  this.config.callback()
                resolve()
            }
        })

        document.body.appendChild(script)

        return p
    }
    
    load () {
        if (typeof window === 'undefined') {
            return null
        }

        mainPromise = mainPromise || this.getMainPromise()

        return new Promise((resolve: any) => {
            mainPromise.then(() => {
                console.log(`${this.config.key} has loaded by API Loader...`)
                resolve()
            })
        })
    }
}