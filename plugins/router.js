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
export default ({ app}) => {  
    app.router.beforeEach((to, from, next) => {      // 进度条开始
      NProgress.start();    
      console.log(to);
      next()  
    })  
    app.router.afterEach((to, from, next) => {
     // 进度条结束
     NProgress.done();  
    })
}

