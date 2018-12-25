# houduan

> VUE  NUXTJS 服务端渲染脚手架

## Build Setup

``` bash
# 初始化
$ npm install

# 服务器地址 localhost:3000
$ npm run dev

# 打包并启动服务器
$ npm run build
$ npm start

# generate static project
$ npm run generate
```
## 实现功能及文件介绍
``` bash
#log 日志保存成文件
详见./server/logs.js

# 上传功能
详见./server/uoload.js

# 服务端ajax
详见./server/ajax.js

# websocket
详见./server/websocket.js

# VUE路由守卫
详见./plugins/rooterbeforeEach.js

# 服务器渲染前事件
详见./plugins/sever_before.js



```


For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
