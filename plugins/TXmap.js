

const ajax=require('../server/ajax');
const qs=require('qs');

module.exports={
    geocoder:(req,res)=>{        
        var path='/ws/geocoder/v1/?'+qs.stringify(req.body)
        console.log(path)
        ajax.httpsrequest({
            host:'apis.map.qq.com',
            port:443,
            method:'GET',
            originalUrl:path,
            headers:{},
        },function(e){
            res.send(e)
        })
    }

}