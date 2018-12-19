<template>
  <div id="header-box" class="header-box">
    <div>
      <header class="header-w">
        <div class="header-w-box">
          <div class="nav-logo">
            <h1>
              <router-link to="/" title="在线考试">在线考试</router-link>
            </h1>
          </div>
          <div class="nav-bar">
            <el-menu
              :show-timeout="200"
              :default-active="$route.path"
              class="el-menu-header"
              mode="horizontal">
              <el-menu-item index="/home" @click="open('/home')">首页</el-menu-item>
              <el-menu-item index="/function/functions" @click="open('/function/functions')">功能</el-menu-item>
              <el-menu-item index="/us/uss" @click="open('/us/uss')">我们</el-menu-item>
            </el-menu>
          </div>
          <div class="line"></div>
          <div class="right-box">
            <div class="nav-list">
              <el-autocomplete
                placeholder="请输入考试信息"
                v-model="input"
                suffix-icon="search"
                :minlength=1
                :maxlength=100
                :fetch-suggestions="querySearchAsync"
                :trigger-on-focus="false"
                :on-icon-click="handleIconClick"
                @keydown.enter.native="handleIconClick"
                @select="handleSelect">
              </el-autocomplete>
            </div>
            <div class="nav-aside" ref="aside">
              <div class="user pr">
                <router-link to="/user">个人中心</router-link>
                <div class="nav-user-wrapper pa" v-if="login">
                  <div class="nav-user-list">
                    <ul>
                      <li class="nav-user-avatar">
                        <div>
                          <span class="avatar" style="background-image: url(../../../static/images/home/user.png)">
                          </span>
                        </div>
                        <p class="name">{{userInfo.username}}</p>
                      </li>
                      <li>
                        <router-link to="/user/infor">账号资料</router-link>
                      </li>
                      <li>
                        <a href="javascript:void(-1);" @click="logOut">退出</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    // 监听滚动
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 导航栏切换
    open (path) {
      console.log(path)
      this.$router.push({
        path: path,
        query: {}
      })
    },
    handleScroll () {
      let nav = document.getElementById('header-box')
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 50) {
        nav.style.position = 'fixed'
        nav.style.top = '0'
        nav.style.zIndex = '99999'
      } else {
        //nav.style.position = 'relative'
      }
    },
    querySearchAsync (queryString, callback) {
      const exams = [{
        name: '语文考试',
        value: '语文考试'
      }, {
        name: '数学考试',
        value: '数学考试'
      }]
      console.log(queryString)
      callback(exams)
    },
    // 选择事件
    handleSelect (item) {
      console.log(item)
    },
    // 点击搜索图标
    handleIconClick (item) {
      console.log(item)
    },
    // 登出
    logOut () {
      console.log('登出.')
    }
  },
  data () {
    return {
      userInfo: {
        username: '张三'
      },
      login: true,
      input: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/mixin.scss";
  header {
    height: 80px;
    z-index: 30;
    position: relative;
  }
  .header-box {
    width: 100%;
    background-color: #ffffff;
  }
  .header-w-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    h1 {
      height: 100%;
      display: flex;
      align-items: center;
      > a {
        background-size: cover;
        display: block;
        @include wh(220px, 50px);
        text-indent: -9999px;
        background: url(/static/images/home/logo.png) no-repeat 0 0;
      }
    }
    .nav-list {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 22px;
      .el-autocomplete {
        width: 305px;
      }
      a {
        width: 110px;
        color: #c8c8c8;
        display: block;
        font-size: 14px;
        padding: 0 25px;
        &:hover {
          color: #fff;
        }
      }
      a:nth-child(2) {
        margin-left: -10px;
      }
    }
    .nav-aside {
      position: relative;
      &:before {
        background: #333;
        background: hsla(0, 0%, 100%, .2);
        content: " ";
        @include wh(1px, 13px);
        overflow: hidden;
        display: flex;
        align-items: center;
        left: 0;
      }
      &.fixed {
        width: 262px;
        position: fixed;
        left: 50%;
        margin-left: 451px;
        margin-top: 0;
        z-index: 32;
        top: -40px;
        -webkit-transform: translate3d(0, 59px, 0);
        transform: translate3d(0, 59px, 0);
        -webkit-transition: -webkit-transform .3s cubic-bezier(.165, .84, .44, 1);
        transition: transform .3s cubic-bezier(.165, .84, .44, 1);
        .user {
          &:hover {
            a:before {
              background-position: -215px 0;
            }
          }
        }
      }
    }
    .right-box {
      display: flex;
    }
    .nav-aside {
      display: flex;
      align-items: center;
    }
    .user {
      margin-left: 41px;
      width: 36px;
      &:hover {
        a:before {
          background-position: -5px 0;
        }
        .nav-user-wrapper {
          top: 18px;
          visibility: visible;
          opacity: 1;
          -webkit-transition: opacity .15s ease-out;
          transition: opacity .15s ease-out;
        }
      }
      > a {
        position: relative;
        @include wh(36px, 20px);
        display: block;
        text-indent: -9999px;
        &:before {
          content: " ";
          position: absolute;
          left: 8px;
          top: 0;
          @include wh(20px);
          background: url(/static/images/home/account-icon.png) -155px 0;
          background-size: 240px 107px;
          transition: none;
        }

      }
      li + li {
        text-align: center;
        position: relative;
        border-top: 1px solid #f5f5f5;
        line-height: 44px;
        height: 44px;
        color: #616161;
        font-size: 12px;
        &:hover {
          background: #fafafa;
        }
        a {
          display: block;
          color: #616161;
        }
      }
      .nav-user-avatar {
        > div {
          position: relative;
          margin: 0 auto 8px;
          @include wh(46px);
          text-align: center;
          &:before {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            border-radius: 50%;
            box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .06);
          }
          .avatar {
            border-radius: 50%;
            display: block;
            @include wh(100%);
            background-repeat: no-repeat;
            background-size: contain;
          }
        }
        .name {
          margin-bottom: 16px;
          font-size: 12px;
          line-height: 1.5;
          text-align: center;
          color: #757575;
        }
      }
      .nav-user-wrapper {
        width: 168px;
        transform: translate(-50%);
        left: 50%;
      }
      .nav-user-list {
        width: 168px;
        &:before {
          left: 50%;
        }
      }
    }
  }
  // 用户信息弹出
  .nav-user-wrapper {
    position: absolute;
    z-index: 30;
    padding-top: 18px;
    opacity: 0;
    visibility: hidden;
    top: -3000px;
    .nav-user-list {
      position: relative;
      padding-top: 20px;
      background: #fff;
      border: 1px solid rgba(0, 0, 0, .08);
      border-radius: 8px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, .15);
      z-index: 10;
      &:before {
        position: absolute;
        content: " ";
        background: url(/static/images/home/account-icon.png) no-repeat -49px -43px;
        background-size: 240px 107px;
        @include wh(20px, 8px);
        top: -8px;
        margin-left: -10px;
      }
    }
  }
  .nav-bar {
    display: flex;
  }
  .el-menu-header {
    color: #666666;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    padding: 12px 20px 12px 19px;
    border: 1px solid transparent;
    bottom: -1px;
    -moz-transition: none;
    -o-transition: none;
    transition: none;
    background-color: transparent;
    border-radius: 0;
    margin: 12px 0 5px;
  }
</style>
