import router from './router/index'
import store from './store'
//全局路由前置守卫
const whiteList=['/login','/404']
router.beforeEach(async(to,from,next) => {
   const token=store.state.user.token
   if(token){
    //获取用户信息
    if (!store.state.user.userInfo.userId) {
     await  store.dispatch('user/getUserInfo')
    }
    
    if(to.path==='/login'){
      next('/')
    }else{
      next()
    }
   }else{
    const isinclude= whiteList.includes(to.path)
    if(isinclude){
      next()
    }else{
       next('/login')
    }
   }
})