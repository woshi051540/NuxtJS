<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">houduan</h1>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
        </FormItem>
        <img :src="imgs"  />
        <Upload action="./upload" @onsucces="upload">
          <Button icon="ios-cloud-upload-outline">Upload files</Button>
      </Upload>
      </Form>
      <h2 class="subtitle">My solid Nuxt.js project</h2>
      <div class="links">
        <nuxt-link to="/loginout">退出登录</nuxt-link>
        <nuxt-link to="/login">登录</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import {ceshi1} from '~/assets/serviceapi/login.js'

export default {
  components: {
    Logo
  },
  data () {
      return {
           imgs:null,
          formInline: {
              user: '',
              password: ''
          },
          ruleInline: {
              user: [
                  { required: true, message: 'Please fill in the user name', trigger: 'blur' }
              ],
              password: [
                  { required: true, message: 'Please fill in the password.', trigger: 'blur' }
              ]
          }
      }
  },
  methods: {
    upload:function(response, file, fileList){
     this.imgs=response.data[0]
    },
        handleSubmit(name) {
              this.$refs[name].validate((valid) => {
                  if (valid) {
                      ceshi1(this.formInline).then(data=>{
                        this.$Message.warning(data)
                      })
                  } else {
                      this.$Message.error('输入错误');
                  }
              })
          }            
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
