<template>
  <div>
    <!--主页介绍 -->
    <div id="home">
      <img id="bg" src="../../../static/images/home/index_bg.jpg" alt="方便好用的考试平台">
      <div id="home-msg">方便好用的考试平台</div>
      <router-link to="/register" title="免费注册" class="register-now">免费注册</router-link>
    </div>

    <!-- 产品特色 -->
    <div id="features">
      <el-row class="features-msg">
        <el-col :span="24" style="color: black;">
          <h1>产品特色</h1>
        </el-col>
      </el-row>
      <el-row class="features-img">
        <el-col :span="6">
          <router-link to="/home">
            <img class="img" src="../../../static/images/home/icon_features1.png">
            <div class="msg-text">实时保存</div>
            <div class="msg-text-detail">实时保存答题记录，不用担心重启、崩溃等现象。</div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/home">
            <img class="img" src="../../../static/images/home/icon_features2.png">
            <div class="msg-text">智能判分</div>
            <div class="msg-text-detail">交卷后立即出分、分析正确率，主观题还可人工阅卷后打分。</div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/home">
            <img class="img" src="../../../static/images/home/icon_features3.png">
            <div class="msg-text">自动分析</div>
            <div class="msg-text-detail">图表展现最高分、最低分、列表展示每个考试分数。</div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/home">
            <img class="img" src="../../../static/images/home/icon_features4.png">
            <div class="msg-text">错题记录</div>
            <div class="msg-text-detail">在线练习完后自动判分、错题记录。</div>
          </router-link>
        </el-col>
      </el-row>
    </div>

    <!-- 适用场景 -->
    <div id="scenes">
      <el-row class="scenes-msg">
        <el-col :span="24" style="color: black;">
          <h1>适用场景</h1>
        </el-col>
      </el-row>
      <el-row class="scenes-img">
        <el-col :span="6">
          <router-link to="/home">
            <img class="img" src="../../../static/images/home/icon_scenes1.jpg">
            <div class="msg-text">内部考核</div>
            <div class="msg-text-detail">入职培训、岗位评级、企业文化普及</div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/home">
            <img class="img" src="../../../static/images/home/icon_scenes2.jpg">
            <div class="msg-text">经销商考核</div>
            <div class="msg-text-detail">产品知识、销售技巧和政策的考核</div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/home">
            <img class="img" src="../../../static/images/home/icon_scenes3.jpg">
            <div class="msg-text">培训机构</div>
            <div class="msg-text-detail">随堂测验、课后作业、模考练习</div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/home">
            <img class="img" src="../../../static/images/home/icon_scenes4.jpg">
            <div class="msg-text">招聘考试</div>
            <div class="msg-text-detail">高效组织校园招聘和社会招聘</div>
          </router-link>
        </el-col>
      </el-row>
    </div>

    <!-- 产品功能 -->
    <div id="function">
      <el-row class="function-msg">
        <el-col :span="24" style="color: black;">
          <h1>产品功能</h1>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="在线考试" name="first">
          <el-row class="function-img">
            <el-col :span="8">
              <router-link to="/home">
                <img class="img" src="../../../static/images/home/icon_function1.jpg">
                <div class="msg-text">最近发布</div>
                <div class="msg-text-detail">查看、参加最近发布的考试</div>
              </router-link>
            </el-col>
            <el-col :span="8">
              <router-link to="/home">
                <img class="img" src="../../../static/images/home/icon_function2.jpg">
                <div class="msg-text">模拟考试</div>
                <div class="msg-text-detail">主观题，看完考生所答情况手动评分</div>
              </router-link>
            </el-col>
            <el-col :span="8">
              <router-link to="/home">
                <img class="img" src="../../../static/images/home/icon_function3.jpg">
                <div class="msg-text">考试记录</div>
                <div class="msg-text-detail">查看个人的考试记录、批改状态</div>
              </router-link>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="在线学习" name="second">
          <el-row class="function-img">
            <el-col :span="8">
              <router-link to="/home">
                <img class="img" src="../../../static/images/home/icon_function4.jpg">
                <div class="msg-text">在线学习</div>
                <div class="msg-text-detail">支持选择题</div>
              </router-link>
            </el-col>
            <el-col :span="8">
              <router-link to="/home">
                <img class="img" src="../../../static/images/home/icon_function5.jpg">
                <div class="msg-text">错题记录</div>
                <div class="msg-text-detail">收录错误的题目</div>
              </router-link>
            </el-col>
            <el-col :span="8">
              <router-link to="/home">
                <img class="img" src="../../../static/images/home/icon_function6.jpg">
                <div class="msg-text">自动评分</div>
                <div class="msg-text-detail">自动评分,正确率</div>
              </router-link>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="考试记录" name="third">
          <el-row class="function-img">
            <el-col :span="24">
              考试记录
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-if="isActive" class="go-top-box" @click="goTop(step)">
      <i class="top-icon el-icon-caret-top"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 50
    }
  },
  data () {
    return {
      activeName: 'first',
      isActive: false
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 返回顶部
    goTop: function (i) {
      document.documentElement.scrollTop -= i
      if (document.documentElement.scrollTop > 0) {
        setTimeout(() => this.goTop(i), 16)
      }
    }
  },
  created () {
    let vm = this
    window.onscroll = function () {
      vm.isActive = document.documentElement.scrollTop > 60
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/mixin.scss";
  #bg {
    width: 100%;
    margin: auto;
  }

  #home-msg {
    font-size: 40px;
    color: #3a3a3a !important;
    position: absolute;
    top: 120px;
    text-align: center;
    width: 100%;
  }
  /* 注册 */
  .register-now {
    font-size: 20px;
    background-color: #178dff;
    color: #fff !important;
    width: 180px;
    height: 60px;
    line-height: 55px;
    position: absolute;
    margin-left: -80px;
    left: 50%;
    top: 200px;
    text-align: center;
    text-decoration: none;
  }
  /* 产品特色 */
  .features-msg {
    padding-top: 10px;
    height: 120px;
    color: #fff;
    background-color: #fff;
    text-align: center;
  }

  /* 产品特色 */
  .features-img {
    color: #fff;
    background-color: #fff;
    text-align: center;
    align-items: center;
  }

  .msg-text {
    font-size: 18px;
    color: #178dff;
    margin-top: 29px;
    margin-bottom: 21px;
    text-align: center;
  }

  .msg-text-detail {
    font-size: 14px;
    color: #474747;
    text-align: center;
  }

  a {
    text-decoration: none;
    outline: none;
    color: #555;
  }

  /* 适用场景 */
  .scenes-msg {
    padding-top: 10px;
    height: 120px;
    color: #fff;
    background-color: #fff;
    text-align: center;
  }
  .scenes-img {
    color: #fff;
    background-color: #f6f6f6;
    text-align: center;
    align-items: center;
  }

  /* 产品功能 */
  .function-msg {
    padding-top: 10px;
    height: 120px;
    color: #fff;
    background-color: #fff;
    text-align: center;
  }
  .function-img {
    color: #fff;
    background-color: #fff;
    text-align: center;
    align-items: center;
  }

  /* 返回顶部 */
  .go-top-box {
    background-color: #fff;
    position: fixed;
    right: 100px;
    bottom: 150px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
    transition: .3s;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    z-index: 5;
  }
  .top-icon {
    color: #409eff;
    display: block;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
  }
</style>
