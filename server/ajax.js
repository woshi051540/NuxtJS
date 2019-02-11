const http = require('http');
const https = require('https');
let config = require('../nuxt.config.js')

var  apiHost =config.tableproxy.proxy.target.replace('http://','');
var  port=80;
 if(apiHost.indexOf(':')>0){
    var newapiHost=apiHost.split(':');
    apiHost=newapiHost[0];
    port=newapiHost[1];
 }
module.exports = {
    httpsrequest: function(options,callback){
        var newoptions={
            host:options.host||apiHost,
            port:options.port||443,
            method:options.method,
            path:options.originalUrl
        }
        if(newoptions.method=='POST'){
            newoptions.headers['Content-Length']=Buffer.byteLength(JSON.stringify(options.body))
        }         
        const req =   https.request(newoptions,(res)=>{
                var body = [];
                res.on('data',  (chunk)=>{
                    body.push(chunk);
                });
                res.on('end', function(){
                    body = Buffer.concat(body);
                    callback(body.toString());
                });
            });
            req.on('error', (e) => {
                callback(`请求遇到问题: ${e.message}`);
            });
            if(newoptions.method=='POST'){
                req.write(JSON.stringify(options.body));
            }
            req.end()
    },    
    httprequest: function(options,callback){
        var newoptions={
            host:options.host||apiHost,
            port:options.port||port,
            method:options.method,
            path:options.originalUrl,
            headers:options.headers,
            timeout:60000
        }   
        if(newoptions.method=='POST'){
            newoptions.headers['Content-Length']=Buffer.byteLength(JSON.stringify(options.body))
        }
            const req =  http.request(newoptions, (res)=>{
                res.setEncoding('utf8');
                var _data = '';
                res.on('data', (chunk)=>{
                    _data += chunk;
                });
                res.on('end',()=>{
                    callback(_data);
                });
            });
            req.on('error', (e) => {
                callback(`请求遇到问题: ${e.message}`);
            });
            if(newoptions.method=='POST'){
                req.write(JSON.stringify(options.body));
            }
            req.end()
    }
};
