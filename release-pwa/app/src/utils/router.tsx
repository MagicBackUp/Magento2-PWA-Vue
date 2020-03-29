import { Router } from '@helper/interface'
import { ROUTER_SET } from '@config/index'

const VueRouterUtil: any =  {
    hasRouter (router: Router) {
        return ROUTER_SET.has(router.name)
    },
    filterRouter (router: Router) {
        if (ROUTER_SET.has(router.name)) {
            return router.path.replace(`/${router.name}/`, '')
        }
    }
}

export default VueRouterUtil