<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-card class="score-gray-box" shadow="hover">
          <div slot="header" class="score-gray-box-title">
            <span>考试成绩</span>
          </div>
          <div class="score">
            <h4>成绩: <span type="success">{{score.score}}</span></h4>
            <h4>正确题数: <span type="success">{{score.correctNumber}}</span></h4>
            <h4>错误题数: <span type="success">{{score.inCorrectNumber}}</span></h4>
            <el-button type="success" size="medium" @click="incorrectAnswer" icon="el-icon-view">查看错题</el-button>
          </div>
        </el-card>
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
      examRecordId: this.$route.query.examRecordId
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
    },
    incorrectAnswer () {
      this.$router.push({name: 'incorrect-answer', query: {examinationId: this.query.examinationId, examRecordId: this.tempExamRecord.id}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/common.scss";
  .score-gray-box {
    @extend .gray-box;
    margin-top: 50px;
  }
  .score-gray-box-title {
    text-align: center;
  }
  .score {
    margin: 20px;
  }
</style>
