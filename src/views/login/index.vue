<template>
  <div>
    <van-field v-model="username" type="number" label="账号" />
    <van-field v-model="password" type="password" label="密码" />
    <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" block @click="login">
      登录
    </van-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: "",
        password: ""
      }
    },
    methods: {
      login() {
        this.$store.dispatch('user/login',{
            username:this.username,
            password:this.password
        }).then(res =>{
          this.$router.push({
            path:"/"
          })
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>