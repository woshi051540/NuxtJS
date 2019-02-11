
const router =require('./router')
var fs = require('fs');
module.exports = {
  mode: 'universal',
  sessionId:null,
  sessionSecret:null,
  //打包配置
  build:{
    //压缩代码
    analyze:true,
    //解析配置
    babel:{

    },
    //缓存
    cache:false,
    //CSSmap
    cssSourceMap:false

  },
  //服务器配置
  server: {
    port: 8892, //服务端口号
    host: '192.168.27.47', //服务端端接口地址
  }, 
  //AJAX环境配置
  env: {
    baseUrl: process.env.BASE_URL || 'http:/localhost:3000'
  }, 
  //代理地址配置
  tableproxy:{
    intercept:'/api',
    proxy:{  
        target: 'http://localhost:8020',  
        changeOrigin: true
    }
  },
  //文件上传配置
  upload:{
    dest:"./destupload",//上传临时目录
    fileFilter: function (req, file, cb) {
      console.log(file)
      var typeArray = file.mimetype.split('/');
      var fileType = typeArray[0];
      if (fileType == 'image') {
        cb(null, true);
      } else if(fileType == 'application'){
        if(typeArray[1]=='zip' ||typeArray[1]=='rar'||typeArray[1]=='pdf'){
          cb(null, true);
        }else{
          cb(null, true);
        }
      }else{
        cb(null, true)
      }
    },//文件过滤
    limits:{
      fieldNameSize:'200bytes',
      fieldSize:'20MB'
    },//大小限制
    preservePath:false,//是否保存文件名
  },
  /*
  ** 页面标题
  */
  head: {
    title: '我的测试项目',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '我的测试项目,来自李浩明的测试项目' },
      { name: 'keywords', content: '我的测试项目，我的关键词是：测试' },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** 自定义进度条颜色
  */
  loading: { color: '#fff' },
  //初始化加载时等待配置
  loadingIndicator:{
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  },
  /*
  ** 全局 CSS
  */
  css: [
    
  ],
  //路由
  router:router.router,
  /*
  ** 在安装应用程序之前加载插件
  */
  plugins: [    
    {src:'~/plugins/sever_before',ssr:true},
    /** 配置路由守卫*/
    {src:'~/plugins/rooterbeforeEach'},
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    

  ],

  /*
  ** 构建配置
  */
  build: {
    /*
      您可以在这里扩展webpack 配置。
    */
    extend(config, ctx) {
      
    }
  },
  //VUE配置项
  /*vue:{
    config:{}
  }*/


}
