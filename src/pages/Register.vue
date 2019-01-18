<template>
  <div class="register">
    <mt-header fixed>
      <mt-button @click="$router.back()" slot="left" icon="back"></mt-button>
    </mt-header>
    <div class="logo"></div>
    <mt-field class="register-username" :state="usernameState" label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field class="register-phone" :state="phoneState" label="手机号" placeholder="请输入手机号" v-model="phone"></mt-field>
    <mt-field class="register-email" :state="emailState" label="邮箱" placeholder="请输入邮箱" v-model="email"></mt-field>
    <mt-field class="register-password" :state="passwordState" label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-field class="register-password" :state="tpasswordState" label="确认密码" placeholder="请输入再次密码" type="password" v-model="tpassword"></mt-field>
    <mt-button class="register-btn" @click="handleRegister"  type="primary" size="large">注册</mt-button>
    <div class="login">
      <span>已有账号？</span>
      <router-link
        tag="span"
        :to="{name: 'login'}"
      >去登录</router-link>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'
export default {
  name: 'register',
  data () {
    return {
      username: '',
      phone: '',
      email: '',
      password: '',
      tpassword: '',
      usernameState: '',
      phoneState: '',
      emailState: '',
      passwordState: '',
      tpasswordState: '',
      judge: []
    }
  },
  computed: {
    ...mapState(['isRegister', 'user'])
  },
  watch: {
    isRegister () {
      if (this.isRegister === true) {
        const redirect = '/login'
        this.$router.push(redirect)
      }
    }
  },
  methods: {
    ...mapMutations(['registerSuccess']),
    validateUsername () {
      const usernameReg = /^[a-zA-Z0-9_-]{2,6}$/
      if (!usernameReg.test(this.username)) {
        this.usernameState = 'error'
      } else {
        this.usernameState = 'success'
      }
    },
    validatePhone () {
      const phoneReg = /^[1]{1}[3,5,7,8]{1}[0-9]{9}$/
      if (!phoneReg.test(this.phone)) {
        this.phoneState = 'error'
      } else {
        this.phoneState = 'success'
      }
    },
    validateEmail () {
      // eslint-disable-next-line
      const emailReg = /^[a-zA-Z0-9_]{3,10}\@[a-zA-Z]{2,4}\.[a-zA-Z]{2,4}$/
      if (!emailReg.test(this.email)) {
        this.emailState = 'error'
      } else {
        this.emailState = 'success'
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
    validateTpassword () {
      // eslint-disable-next-line
      if (this.tpassword == '') {
        this.tpasswordState = 'error'
      } else if (this.tpassword !== this.password) {
        this.tpasswordState = 'error'
        this.$toast({
          message: '请输入相同的密码',
          duration: 4000
        })
      } else {
        this.tpasswordState = 'success'
      }
    },
    handleRegister () {
      this.validateUsername()
      this.validatePhone()
      this.validateEmail()
      this.validatePassword()
      this.validateTpassword()
      if (this.usernameState === 'success' && this.phoneState === 'success' && this.emailState === 'success' && this.passwordState === 'success' && this.tpasswordState === 'success') {
        this.judge = this.user.some(item => (item.phone === this.phone) || (item.email === this.email))
        // 手机号和邮箱都没被注册
        if (this.judge === false) {
          this.registerSuccess({
            username: this.username,
            phone: this.phone,
            email: this.email,
            password: this.password
          })
          this.$toast({
            message: '注册成功',
            duration: 2000
          })
        } else {
          // 手机号或邮箱被注册
          this.$toast({
            message: '该邮箱或手机号已被注册',
            duration: 2000
          })
        }
      } else {
        this.$toast({
          message: '请输入正确的用户信息',
          duration: 2000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
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
  &-username, &-phone, &-email, &-password {
    width: 80%;
    margin-left: 10%;
  }
  &-btn {
    background-color: black;
    width: 80%;
    margin-left: 10%;
    margin-top: 7vw;
  }
  .login {
    margin-top:31vw;
    text-align: right;
    color: #999;
    margin-right: 11%
  }
}
</style>
