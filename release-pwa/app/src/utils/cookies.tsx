import { VueConstructor } from 'vue'
import Cookies, { CookieAttributes } from 'js-cookie'

const VueCookies: any = {
    install: (Vue: VueConstructor, options?: CookieAttributes) => {
        Cookies.defaults = Object.assign(Cookies.defaults, options)

        const cookies: any = {
            get: (key: string): string | undefined  => {
                return Cookies.get(key)
            },
            set: (key: string, value: string, opts?: CookieAttributes) => {
                if (!key) {
                    throw new Error(`cookie name is not find in first argument`)
                } else if (/^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
                    throw new Error(`cookie key name illegality, current key name: ${key}`)
                }

                Cookies.set(key, value, { ...opts })
            },
            remove: (key: string, opts?: CookieAttributes) => {
                if (!key || !cookies.isKey(key)) {
                    return false
                }
               
                Cookies.remove(key, { ...opts })
            },
            isKey: (key: string) => {
                return (new RegExp("(?:^|;\\s*)" + window.encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie)
            },
            keys: () => {
                if (!document.cookie) return []
        
                let _keys: any[] = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/)
        
                for (let _index = 0; _index < _keys.length; _index++) {
                    _keys[_index] = window.decodeURIComponent(_keys[_index])
                }
        
                return _keys
            }
        }

        Vue.prototype.$cookies = cookies
    }
}

export default VueCookies