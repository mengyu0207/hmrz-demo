// import { config } from '@vue/test-utils';
import axios from 'axios'
import { Message } from 'element-ui';
import store from '@/store'
// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:8888/api',
  timeout: 5000
})
service.interceptors.request.use((config) => {
    if (store.state.user.token) {
      config.headers.Authorization = "Bearer " + store.state.user.token;
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

function(error){
  return Promise.reject(error)
}
) //响应拦截器

export default service   //导出axios实例