import {getUserInfoAPI, getUserDetailById,login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo:{}
  },
  mutations: {
    setToken(state,payload){
      state.token=payload
    },
    setUserInfo(state,payload){
      state.userInfo=payload
    }
  },
  actions: {
   async getToken(context,payload){
    
      const res= await login(payload)
      console.log(res);
      context.commit('setToken',res)
   
    },
   async getUserInfo(context){
       const res= await getUserInfoAPI()
     const userDetailInfo= await getUserDetailById(res.userId)
     console.log(userinfo);
      console.log(res);
     context.commit('setUserInfo',{...userDetailInfo,...res})
 
    }
  }
}
