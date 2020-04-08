import { Router } from '@helper/interface'
import { DEFAULT_ROUTER_SET } from '@config/index'

const VueRouterUtil: any =  {
    hasRouter (router: Router) {
        return DEFAULT_ROUTER_SET.has(router.name)
    },
    filterRouter (router: Router) {
        if (DEFAULT_ROUTER_SET.has(router.name)) {
            return router.path.replace(`/${router.name}/`, '')
        }
    }
}

export default VueRouterUtil