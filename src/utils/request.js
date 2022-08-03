// import { config } from '@vue/test-utils';
import axios from 'axios'
import { Message } from 'element-ui';
import store from '@/store'
import {getTokenTime} from '@/utils/auth'
import router from '@/router';
// create an axios instance
function isTimeout(){
  const currentTime = Date.now();
  const tokenTime=getTokenTime()
  const timeout = 3*1000
  return currentTime - tokenTime>timeout
}
const service = axios.create({
  baseURL: 'http://localhost:8888/api',
  timeout: 5000
})
service.interceptors.request.use(async(config) => {
    if (store.state.user.token) {
    if(isTimeout()){
      await store.dispatch('user/logout');
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    
    }else{
      //token 没有过期
          config.headers.Authorization = "Bearer " + store.state.user.token;
    }

    }
    return config;
  });
//请求拦截器
service.interceptors.response.use((res)=>{
   const{success,data,message} =res.data
  if(success){
    return data 
  }
  Message({
    showClose: true,
    message: '警告哦，这是一条警告消息',
    type: 'warning'
  });
  console.log(message)
  return Promise.reject(new Error(message))
},

async  function(error){
  if(error?.response?.status===401){
    Message.error('登录过期')
    await store.dispatch('user/logout')
    router.push('/login')
  }else{
    Message.error(error.message)
  }
 
  return Promise.reject(error)
}
) //响应拦截器

export default service   //导出axios实例