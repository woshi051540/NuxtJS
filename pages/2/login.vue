<template>
    <i-form :model="formInline" >
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
                }

            }
        },
        methods: {
            handleSubmit(name) {
                //login(this.formInline).then((res)=>{
                     this.$store.use=true;
                    this.$router.replace('/2/')
                //})
                        
            }
        }
    }
</script>


