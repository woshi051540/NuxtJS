
const express = require('express')
const proxy = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const { Nuxt, Builder } = require('nuxt')
const websoket=require('./websocket')
let app =express();
const expressWs = require('express-ws')(app);
let config = require('../nuxt.config.js')

config.dev = !(process.env.NODE_ENV === 'production');
const nuxt = new Nuxt(config);

//定时器
//const interval =require('./Interval');

const uploads=require('./upload')
//文件上传组件
const multer  = require('multer')
//配置文件上传路径
const upload = multer(config.upload)

//http
const host =config.server.host||'127.0.0.1'
const port =config.server.port|| 2700


//日志
const log4js=require('./logs');

 async  function star (){
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    } 
     //注册JSON解析    
    app.use(bodyParser.json()); 
    app.use(bodyParser.urlencoded({ extended: true }));
    
    //全局注册webskoet事件
    app.use(function(req, res, next){
      
      req.socketcz={
          //指定soket
          sendmsg:function(id,msg){  
            if(websoket.socketnum<id){
              return '对方不在线' ;
           }   
            var index=0;     
            expressWs.getWss().clients.forEach(v => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
              if(index==id){
                
                var datamsg=JSON.stringify({wsid:id,data:msg});   
                v.send(datamsg)
              }
              index++;
            });
            return true;
          },
          //所有soket
          sendallmsg:function(msg){
            expressWs.getWss().clients.forEach(v => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
              v.send(msg)
            });
          },
        }
        next(); 
    })
    //拦截webskoet
    app.ws('*', function(socket, req) {
      websoket.socketnum++;
      socket.on('message', function(msg) { 
          try{
            msg=JSON.parse(msg);
          }catch(e){

          }
          if(typeof msg.wsid =='undefined'){
            req.socketcz.sendmsg(websoket.socketnum,msg);
          }else{
            req.body=msg;
            websoket.thishttp(req)
          } 
        });
      socket.on('close', function(msg) {
       
        websoket.socketnum--;
      });
    })

    //图片上传拦截
    if(config.upload!=null){
      //form表单上传
      /*app.post('/upload',function (req, res, next) {
        
         uploads.upload(req, res, next)
      })*/
     app.post('/upload', upload.any(), function (req, res, next) {
       
        uploads.upload(req, res, next)
      })
      //form表单上传
      app.post('/H5upload', uploads.H5upload)
    }
    //拦截所有地址
    app.all('*',websoket.thishttp);
    //注册代理
    //app.use(config.tableproxy.intercept,proxy(config.tableproxy.proxy))
    //注册next
    app.use(nuxt.render)
     //日志输出
    app.use(log4js.debug);
    app.use(log4js.error);
    // 启动服务器
    app.listen(port, host); 
}
star()


