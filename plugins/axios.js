const axios= require('axios');
const qs= require('qs');
const Store=require('../store');

// 创建axios实例
const service = axios.create({
  baseURL:  process.env.baseUrl, 
  timeout: 15000,
 	transformRequest: [function (data, headers) {  	     
		const datas=qs.stringify(data);
		    
    return datas;
  }]       
})

// request拦截器
service.interceptors.request.use(config => {	
		return config
}, error => {
  console.log(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data    
    if (res.code !== '0000') {
	    if(res.code === '1001') {
	        let msg = res.message ? res.message : '提交数据为空'
	        return Promise.reject(msg)
	      } else if(res.code === '1002') {
	        let msg = res.message ? res.message : '请求错误'
	        return Promise.reject(msg)
	      }else if(res.code === '1003' || res.code === '1004'){  
					let msg = res.message ? res.message : '请登录后操作'
					return Promise.reject(msg)
	      }else if(res.code === '0001'){
	      	let msg = res.message ? res.message : '请求错误'
	        return Promise.reject(msg)
	      }else{
	      	return res
	      }
    } else {
      return res
    }
  },
  error => {
    	return Promise.reject(error)
  }
)

module.exports=service