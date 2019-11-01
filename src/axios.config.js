import axios from 'axios'
import Vue from 'vue'

// 改变基路径，可用于联调测试
axios.defaults.baseURL = 'http://localhost:8080'
// 配置axios的拦截器
// 请求拦截器
axios.interceptors.request.use(
  config=>{
    console.log(config)
    
    return config
  },
  error=>{}
)
// 响应拦截器
axios.interceptors.response.use(
  response=>{
    console.log(response)
    
  },
  error=>{

  }
)

Vue.prototype.$axios = axios