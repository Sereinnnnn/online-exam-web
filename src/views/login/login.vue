<template>
  <div class="bg">
    <!-- 背景 -->
    <svg id="bg_svg" viewBox="0 0 1440 480" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid slice">
      <filter id="blur">
        <feGaussianBlur stdDeviation="5"></feGaussianBlur>
      </filter>
      <image xlink:href="static/images/login/login-bg.jpg" width="1440" height="480" filter="url(#blur)"></image>
    </svg>
    <!-- 注册、登录表单 -->
    <div class="login-wrap">
      <el-tabs v-model="activeName">
        <!-- 注册 -->
        <el-tab-pane label="注册" name="/register" class="login-wrap-title">
          <el-form ref="registerForm" :model="register.form" :rules="register.rules" class="login-form" auto-complete="on" label-position="left">
            <el-form-item prop="username">
              <el-input placeholder="用户名" v-model="register.form.username" name="username" type="text" auto-complete="on"/>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="密码" :type="register.passwordType" v-model="register.form.password" name="password" auto-complete="on" @keyup.enter.native="handleRegister"/>
            </el-form-item>
            <el-form-item>
              <el-button :loading="register.loading" type="primary" @click.native.prevent="handleRegister">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 登录 -->
        <el-tab-pane label="登录" name="/login" class="login-wrap-title">
          <el-form ref="loginForm" :model="login.form" :rules="login.rules" class="login-form" auto-complete="on" label-position="left">
            <el-form-item prop="username">
              <el-input placeholder="用户名" v-model="login.form.username" name="username" type="text" auto-complete="on"/>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="密码" :type="login.passwordType" v-model="login.form.password" name="password" auto-complete="on" @keyup.enter.native="handleLogin"/>
            </el-form-item>
            <el-form-item prop="code">
              <el-row :span="24">
                <el-col :span="14">
                  <el-input :maxlength="code.len" v-model="login.form.code" size="small" auto-complete="off" placeholder="请输入验证码" @keyup.enter.native="handleLogin" />
                </el-col>
                <el-col :span="10">
                  <div class="login-code">
                    <span v-if="code.type === 'text'" class="login-code-img" @click="refreshCode">{{ code.value }}</span>
                    <img v-else :src="code.src" alt="验证码" class="login-code-img" @click="refreshCode">
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row type="flex" justify="space-between">
                <el-checkbox v-model="login.form.rememberMe">记住密码</el-checkbox>
                <a href="" @click.prevent="openMsg">忘记密码</a>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button :loading="login.loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { randomLenNum } from '@/utils/util'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth' // getToken from cookie

export default {
  data () {
    return {
      activeName: '/login',
      login: {
        form: {
          username: '',
          password: '',
          code: '',
          randomStr: '',
          rememberMe: false
        },
        rules: {
          username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
          password: [
            { required: true, trigger: 'blur', message: '请输入密码' },
            { min: 6, trigger: 'blur', message: '密码长度最少为6位' }],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
          ]
        },
        loading: false,
        passwordType: 'password'
      },
      register: {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
          password: [
            { required: true, trigger: 'blur', message: '请输入密码' },
            { min: 6, trigger: 'blur', message: '密码长度最少为6位' }]
        },
        loading: false,
        passwordType: 'password'
      },
      code: {
        src: '/admin/api/v1/code',
        value: '',
        len: 4,
        type: 'image'
      }
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created () {
    this.activeName = this.$route.fullPath
    this.refreshCode()
  },
  computed: {
    ...mapGetters(['tagWel'])
  },
  methods: {
    refreshCode () {
      this.login.form.code = ''
      this.login.form.randomStr = randomLenNum(this.code.len, true)
      this.code.type === 'text'
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `/admin/api/v1/code/${this.login.form.randomStr}`)
    },
    handleLogin () {
      if (getToken()) {
        // 已经登录，重定向到首页
        this.$router.push('/home')
      } else {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.login.loading = true
            // 登录，获取token
            this.$store.dispatch('LoginByUsername', this.login.form).then(() => {
              this.login.loading = false
              // 重定向到首页
              this.$router.push({ path: this.redirect || '/' })
            }).catch(() => {
              this.login.loading = false
              this.refreshCode()
            })
          } else {
            return false
          }
        })
      }
    },
    // 注册
    handleRegister () {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.register.loading = true
          this.$store.dispatch('RegisterByUsername', this.register.form).then(() => {
            debugger
            this.register.loading = false
            this.$router.push({ path: '/login' })
          }).catch(() => {
            this.register.loading = false
          })
        } else {
          return false
        }
      })
    },
    openMsg () {
      // 使用了国际化
      this.$message.warning('你咋忘不了吃呢？')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss">
  #bg_svg {
    position: fixed;
    top: -10px;
    left: 0;
    width: 100%;
    z-index: -1;
  }
  .bg {
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .login-wrap {
    width: 330px;
    border-radius: 5px;
    padding: 20px;
    margin: 20px;
    background: #ffffff;
    color: #71767a;
    .el-tabs__item {
      font-size: 20px;
    }
    .el-tabs__nav {
      left: 30%;
    }
    .login-code-img {
      margin-left: 15px;
      margin-top: 2px;
    }
    /* 注册登录 */
    .login-wrap-title {
      color: #71767a;
      padding: 10px 0;
      margin: 0 15px;
      cursor: pointer;
      line-height: 24px;
      border-bottom: 2px solid transparent;
    }
    .el-form-item {
      margin-bottom: 25px !important;
    }
    h3 {
      text-align: center;
      color: #ebedef;
      margin-top: 0;
      margin-bottom: 5px;
      span {
        color: #20a0ff;
      }
    }
    form {
      margin-top: 25px;
      .el-form-item {
        margin-bottom: 15px;
      }
    }
    a {
      text-decoration: none;
      color: #1f2d3d;
    }
    button {
      width: 100%;
      font-weight: 600;
    }
  }
</style>
