<template>
    <i-form :model="formInline" :rules="ruleInline" inline>
        <Form-item prop="user">
            <i-input type="text" :value.sync="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
        </Form-item>
        <Form-item prop="password">
            <i-input type="password" :value.sync="formInline.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </i-input>
        </Form-item>
        <Form-item>
            <i-button type="primary" @click="handleSubmit('formInline')">登录</i-button>
        </Form-item>
    </i-form>
</template>
<script>
import {login} from '../../assets/serviceapi/login'
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                //login(this.formInline).then((res)=>{
                    this.$store.use=true;
                    this.$router.replace('/1/')
                //})
                        
            }
        }
    }
</script>


