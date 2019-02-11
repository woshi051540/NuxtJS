let config = require('../nuxt.config.js')
const ajax=require('./ajax');
const TXmap=require('../plugins/TXmap');
//响应外部请求
module.exports={
    socketnum:-1,
    thishttp:function(req,res,next){
            if(req.originalUrl.indexOf('/api')==0){
                res.send(JSON.stringify({success:true,type:2,data:[],rows:[],courseTask:[],permissions:{role:null}}));
                  //next()
                return;
            }
         
            //响应socket
           if(/ceshi1*?/gi.test(req.originalUrl)){
                //soke广播
                var body=req.body;
                var e=req.socketcz.sendmsg(body.wsid,body.contemt)
                if(res){
                    if(e==true){                               
                        res.send('发送成功');
                    }else{
                        res.send(e);
                    }  
                }            
               
                return;
           }
           if(req.originalUrl.indexOf(config.tableproxy.intercept)>0){
                ajax.httprequest(req,(e)=>{                   
                    var e=req.socketcz.sendmsg(req.body.wsid,e)
                    if(res){
                        if(e==true){                               
                            res.send('发送成功');
                        }else{
                            res.send(e);
                        }  
                    }else{
                        res.send(e);
                    } 
                })
                return ;
           }
           if(req.originalUrl.indexOf('/address')==0){
            TXmap.geocoder(req,res)
            return ;
       }
           next()
            
    }


}



