const fs = require('fs');
let config = require('../nuxt.config.js')
module.exports={   
    //form表单上传
    upload:function(req,res,next){
        var uploadurl=[];        
        try{         
            for (var i = 0; i < req.files.length; i++) {
                var seccess=true;
                var imgname=new Date().getTime();
                var typename=req.files[i].originalname.split('.')[1]
                var url= config.upload.dest +'/'+ imgname+'.'+typename;               
                fs.rename(req.files[i].path, url, function(err) {
                    if (err) {
                        seccess=false;
                        console.error(err);
                         return;
                    }                
                })
                if(!seccess){
                    break;
                }
                uploadurl.push(url);
            }
        }catch(e){
            console.log(e)
            res.send(e);
            return;
        } 
        for(var i=0; i<uploadurl.length;i++){
            
        }

        res.json({
            code:200,
            msg:'上传成功',
            data:uploadurl
        })
    },
    //base64上传地址
    H5upload:function(req,res,next){
         var imgData= req.body.imgData;
         var uploadurl=[];
         try{
            imgData=JSON.parse(imgData);
         }catch(e){

         }
         if(typeof(imgData)=='string'){
            var newimgdata=[imgData];
            imgData=newimgdata;
         }     
         try{   
            for(var i=0; i<imgData.length;i++){
                var base64Data = imgData[i].replace(/^data:image\/\w+;base64,/, "");
                 var dataBuffer = new Buffer(base64Data, 'base64');
                var imgname=new Date().getTime();
                 fs.writeFile(config.upload.dest +'/'+imgname+'.png', dataBuffer, function(err) {
                     if(err){                    
                        console.error(err);    
                     }
                 });
                uploadurl.push(config.upload.dest +'/'+imgname+'.png')
            }
        }catch(e){
            res.send(e);
            return;
        }        
        res.json({
            code:200,
            msg:'上传成功',
            data:uploadurl
        })

    }


}