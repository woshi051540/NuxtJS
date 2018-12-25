//配置服务路由
module.exports = {    
    router: {
      mode: 'history',
      //根路由，即访问地址根目录
      base: '/',
      //自定义路由
      extendRoutes(routes, resolve){
        
       
      },
      //转场页面切换时运行的JS，在‘middleware’目录下
      //middleware:'setrouters',

    }
    
  }
