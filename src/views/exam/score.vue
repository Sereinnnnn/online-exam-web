<template>
  <div>
    <el-row class="course-msg">
      <el-col :span="24" style="color: black;">
        <h1>成绩:{{score.score}}</h1>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getScoreList } from '@/api/exam/score'
export default {
  data () {
    return {
      score: {
        score: ''
      },
      query: {}
    }
  },
  computed: {
    // 获取用户信息
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created () {
    this.query = {
      userId: this.$route.query.userId,
      examinationId: this.$route.query.examinationId
    }
    this.getScoreList(this.query)
  },
  methods: {
    getScoreList (query) {
      getScoreList(query).then(response => {
        let scoreList = response.data.list
        if (scoreList.length > 0) {
          this.score = scoreList[0]
        }
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '加载成绩失败',
          type: 'error',
          duration: 2000
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/common.scss";
  .course-msg {
    @extend %message-common;
  }
</style>
