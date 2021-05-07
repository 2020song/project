import router from './router'
import { getToken } from '@/utils/auth'

router.beforeEach(async(to, from, next) => {

    if(getToken()||to.path == "/login"){
        next()
    }else{
        next("/login")
    }
    
})

router.afterEach(() => {
  
})
