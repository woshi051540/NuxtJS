<template>
    <div>
        <h1>确定退出登录？</h1>
        <Button type="primary" @click="handleSubmit()" >确定</Button>
    </div>
</template>
<script>
import {loginout} from '../../assets/serviceapi/login'
export default {
    data () {
        return {}
    },
    methods: {
        handleSubmit() {
            //loginout({}).then(res=>{
                this.$store.use=null;
                 this.$router.replace('/1/')
           // })     
        }
    }
}
</script>