export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '河马大健康',
    htmlAttrs: {
    //   lang: 'cn'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0' },
    //   <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"/>
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {content:'webkit|ie-comp|ie-stand', name:'renderer'}
    ],
    script:[
        {src: "https://map.qq.com/api/gljs?v=1.exp&key=BYMBZ-EVVC6-EDAST-MM3GR-6VLCK-KXB6D",  type: 'text/javascript', mode: 'client'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/static/css/public.css',
    'animate.css/animate.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src:'@/plugins/element-ui',
      ssr:false
    },
    {
      src:'@/plugins/router',
      ssr:false
    },
    {
        src:'@/plugins/request',
        ssr:false
    },
    // {
    //     src:'@/plugins/http',
    //     ssr:false
    // }
    
   
  ],
  image: {
    provider: 'twicpics',
    twicpics: {
      baseURL: ''
    },
    modifiers: {
        effect: 'sharpen:100',
        quality: '50',
      }
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxt/image'
  ],
//   axios: {
//     proxy: true, // 表示开启代理
//     prefix: '/api', // 表示给请求url加个前缀 /api
//     credentials: true // 表示跨域请求时是否需要使用凭证
//    },
   
//    proxy: {
//     '/api': { 
//      target: 'https://hemayy360.com/', // 目标接口域名
//      pathRewrite: { 
//       '^/api': '/', // 把 /api 替换成 /
//       changeOrigin: false // 表示是否跨域 
//      }  
//     }
//    },   

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
  
}
 