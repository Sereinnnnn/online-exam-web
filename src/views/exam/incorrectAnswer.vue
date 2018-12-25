<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-card class="incorrect-answer-gray-box">
          <div class="subject-content" v-for="(tempSubject, index) in incorrectAnswerList" :key="tempSubject.id">
            <div class="subject-title">
              <span class="subject-title-number">{{index + 1}} .</span>
              {{tempSubject.subjectName}}（{{tempSubject.score}}分）
            </div>
            <div class="subject-option">
              <el-radio label="A">A. {{tempSubject.optionA}}</el-radio>
            </div>
            <div class="subject-option">
              <el-radio label="B">B. {{tempSubject.optionB}}</el-radio>
            </div>
            <div class="subject-option">
              <el-radio label="C">C. {{tempSubject.optionC}}</el-radio>
            </div>
            <div class="subject-option">
              <el-radio label="D">D. {{tempSubject.optionD}}</el-radio>
            </div>
            <span>错误答案：{{tempSubject.incorrectAnswer}}</span>
            <span>正确答案：{{tempSubject.incorrectAnswer}}</span>
            <span>解析：{{tempSubject.incorrectAnswer}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getIncorrectAnswerList } from '@/api/exam/incorrectAnswer'
export default {
  data () {
    return {
      incorrectAnswerList: [],
      query: {
        examinationId: '',
        userId: ''
      }
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
    this.getList(this.query)
  },
  methods: {
    getList (query) {
      getIncorrectAnswerList(query).then(response => {
        this.incorrectAnswerList = response.data.list
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '加载错题失败',
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
  .incorrect-answer-gray-box {
    @extend .gray-box;
    margin-top: 50px;
  }
  .incorrect-answer-gray-box-title {
    text-align: center;
  }
  .score {
    margin: 20px;
  }
</style>
