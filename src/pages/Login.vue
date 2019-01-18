<template>
  <div class="login">
    <mt-header fixed>
      <mt-button @click="$router.back()" slot="left" icon="back"></mt-button>
    </mt-header>
    <div class="logo"></div>
    <mt-field class="login-username" :state="usernameState" label="用户名" placeholder="请输入手机号或邮箱" v-model="username"></mt-field>
    <mt-field class="login-password" :state="passwordState" label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-button class="login-btn" @click="handleLogin"  type="primary" size="large">登录</mt-button>
    <div class="register">
      <span>还没账号？</span>
      <router-link
        tag="span"
        class="register"
        :to="{name: 'register'}"
      >去注册</router-link>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      usernameState: '',
      passwordState: '',
      password: '',
      loginJudge: [],
      loginPassword: []
    }
  },
  computed: {
    ...mapState(['isLogin', 'user'])
  },
  watch: {
    isLogin () {
      if (this.isLogin === true) {
        const redirect = this.$route.params.redirect || '/home'
        this.$router.push(redirect)
      }
    }
  },
  methods: {
    ...mapMutations(['loginSuccess']),
    ...mapActions(['login']),
    validateUsername () {
      const phoneReg = /^[1]{1}[3,5,7,8]{1}[0-9]{9}$/
      // eslint-disable-next-line
      const emailReg = /^[a-zA-Z0-9_]{3,10}\@[a-zA-Z]{2,4}\.[a-zA-Z]{2,4}$/
      if (!(phoneReg.test(this.username) || emailReg.test(this.username))) {
        this.usernameState = 'error'
      } else {
        this.usernameState = 'success'
      }
    },
    validatePassword () {
      const passwordReg = /^.{6,}$/
      if (!passwordReg.test(this.password)) {
        this.passwordState = 'error'
      } else {
        this.passwordState = 'success'
      }
    },
    handleLogin () {
      this.validateUsername()
      this.validatePassword()
      if (this.passwordState === 'success' && this.usernameState === 'success') {
        this.loginJudge = this.user.some(item => this.username === item.email || this.username === item.phone)
        this.loginPassword = this.user.filter(item => this.username === item.email || this.username === item.phone)

        if (this.loginJudge === true) {
          if (this.password === this.loginPassword[0].password) {
            this.$toast({
              message: '登陆成功',
              position: 'top',
              duration: 1000
            })
            this.login({
              username: this.username,
              password: this.password
            })
          } else {
            this.$toast({
              message: '密码错误',
              position: 'top',
              duration: 1000
            })
          }
        } else {
          this.$toast({
            message: '该用户不存在',
            position: 'top',
            duration: 1000
          })
        }
      } else {
        this.$toast({
          message: '请输入正确的用户名或密码',
          position: 'top',
          duration: 1000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  .mint-header {
    height: 13vw;
    background-color: #fff;
  }
  .logo {
    width: 100%;
    height: 50vw;
    background:url(../assets/bull.jpg) center 17vw no-repeat;background-size:161px;
    background-size: 28vw auto;
  }
  &-username , &-password {
    width: 80%;
    margin-left: 10%;
  }
  &-btn {
    background-color: black;
    width: 80%;
    margin-left: 10%;
    margin-top: 7vw;
  }
  .register {
    margin-top:60vw;
    text-align: right;
    color: #999;
    margin-right: 7%
  }
}
</style>
