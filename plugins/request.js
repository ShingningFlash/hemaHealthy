// 引入index.js api文件
import indexApi from '@/api/index.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
/*全局配置 加载条*/
NProgress.configure({   
     // 动画方式
    easing: 'ease-out-in',   
    // 递增进度条的速度
    speed: 700,    
    // 是否显示加载ico
    showSpinner: false,
    // 自动递增间隔     
    trickleSpeed: 200,   
    // 初始化时的最小百分比
    minimum: 0.3  
})

export default function({ $axios, store }, inject) {
    function axiosConfig($axios) {
        
    let requestConfig = {}
    // 设置API的域名
    // $axios.setBaseURL('https://www.auto-hand.com')
    
    // console.log($axios.headers,"headers");
    // 设置请求拦截
    $axios.onRequest((config) => {
      // 用于调试
      if (process.env.DEBUG) {
        // console.log('$axios.onRequest', config)
      }
      requestConfig = {
        baseURL: config.baseURL,
        url: config.url,
        method: config.method,
        data: config.data,
        headers: config.headers,
        params: config.params,
      }
      
    //   if(config.method == 'post'){
        config.headers.common['Content-Type'] = 'text/html; charset=utf-8'
    //   }
    //   config.withCredentials = true
    //   config.startTime = new Date().getTime()
    // config.headers.ContentType  = false
   
    //   config.headers.AccessControlAllowOrigin = "*"
      /* 如果你需要token */
      // const token = store.state.token || ''
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }
      NProgress.start();
      return config
    })
    // 设置响应拦截
    $axios.onResponse((response) => {
      response.config.endTime = new Date().getTime()
      const status = response.status
      
      if (+status === 200) {
        NProgress.done();  
        // 打印出每个接口的响应时间
        // console.info(response.config.url,'请求时间',response.config.endTime - response.config.startTime + 'ms'
        // )
        // 用于调试
        if (process.env.DEBUG) {
        //   console.info('$axios.onResponse', response.data)
        }
        // 返回接口数据
        return response.data
      } else {
        // 如果请求失败的，打印出相应的错误信息，更好的修改。
        const responseConfig = response ? response.config : {}
        console.error('响应拦截报错提示： ', {
          url: responseConfig.baseURL + responseConfig.url,
          status: response.status,
          statusText: response.statusText,
          method: responseConfig.method,
          headers: responseConfig.headers,
          data: responseConfig.data,
          params: responseConfig.params,
          responseData: response.data,
        })
      }
    })
  
    // axios错误处理
    $axios.onError((error) => {
      console.log(error);
      const response = error.response || {}
      const responseConfig = response.config || {}
      console.error('$axios.onError: ', error)
      console.error('错误处理提示 ', {
        url: responseConfig.baseURL + responseConfig.url,
        status: response.status,
        statusText: response.statusText,
        method: responseConfig.method,
        headers: responseConfig.headers,
        data: responseConfig.data,
        params: responseConfig.params,
        responseData: response.data,
        ...requestConfig,
      })
  
    })
    // 最后返回$axios对象
    return $axios
  }
  
  inject('indexApi', indexApi(axiosConfig($axios.create())))
  }
  
  