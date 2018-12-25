<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        {{name}}
        {{path}}
      </h1>
      <p>
        <span v-for="i in msg" >
          {{i}}
        </span>

      </p>
      <h2 class="subtitle">
        <input type="text" v-model="addrss"/>我是地址：{{addrssip}}
      </h2>
      <div class="links">
        <nuxt-link to="/1/loginout">退出登录</nuxt-link>
        <nuxt-link to="/1/login">登录</nuxt-link>
        <button @click="websokets">点我</button>
        <button @click="ajax">ajax</button>
        <button @click="getaddrssip_s">getaddrssip_s</button>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import {login,getaddrssip} from '~/assets/serviceapi/login.js'

export default {
  metaInfo: {
    title: '我是页面的',
    titleTemplate: '%s - Baz'
  },
  data(){    
    return{
      name:"我是默认的",
      path:'我是色',
      msg:[],
      ws:null,
      addrssip:'',
      addrss:'河南省郑州市郑东新区，商务外环20号，海联大厦',
    }
  },
  components: {
    Logo
  },
  asyncData (context) {    
    return { name: '我是请求的' }
  },
  methods:{
    websokets(){
      console.log("Connection open ..."); 
       var g=this;
        g.name="我是页面上的";
        if( g.ws==null){
           g.ws = new WebSocket("ws://192.168.27.47:3000/ceshi1");
        }else{
            g.ws.send(JSON.stringify({wsid:g.wsid,contemt:'Hello WebSockets!'}));
        }
        g.ws.onopen = function(evt) { 
            g.ws.send("Hello WebSockets!");
        };

        g.ws.onmessage = function(evt) {
              evt=JSON.parse(evt.data);
              g.wsid=evt.wsid;
              g.msg.push(evt.data) 
        };

        g.ws.onclose = function(evt) {
          console.log("Connection closed.");
        };      
    },
    ajax(){
      login({}).then(e=>{
        console.log(e)
      }).catch(e=>{
        console.log(e)
      })
    },
    getaddrssip_s(){
      getaddrssip({
        address:this.addrss,
        key:'B6YBZ-OO2RW-3KFRR-OY2B7-XR2I2-QDBL3'
      }).then(e=>{
        console.log(e)
      }).catch(e=>{
        console.log(e)
      })
    }
  },
  mounted(){
    setTimeout(()=>{
      this.websokets()
    },2000)
  }
}
</script>

<style>

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
