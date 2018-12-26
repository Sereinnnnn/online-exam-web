<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-card class="incorrect-answer-gray-box">
          <div class="subject-content" v-for="(tempSubject, index) in incorrectAnswerList" :key="tempSubject.id">
            <div class="subject-content-option">
              <div class="subject-title">
                <span class="subject-title-number">{{index + 1}} .</span>
                {{tempSubject.subjectName}}（{{tempSubject.score}}分）
              </div>
              <div class="subject-option" :class="getClass(tempSubject.answer, tempSubject.incorrectAnswer, 'A')">
                A. {{tempSubject.optionA}}
              </div>
              <div class="subject-option" :class="getClass(tempSubject.answer, tempSubject.incorrectAnswer, 'B')">
                B. {{tempSubject.optionB}}
              </div>
              <div class="subject-option" :class="getClass(tempSubject.answer, tempSubject.incorrectAnswer, 'C')">
                C. {{tempSubject.optionC}}
              </div>
              <div class="subject-option" :class="getClass(tempSubject.answer, tempSubject.incorrectAnswer, 'D')">
                D. {{tempSubject.optionD}}
              </div>
            </div>
            <p class="subject-content-answer">
              参考答案：{{tempSubject.answer}}
            </p>
            <p class="subject-content-analysis">
              解析：{{tempSubject.analysis}}
            </p>
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
    },
    getClass (answer, incorrectAnswer, option) {
      // 和参考答案一样
      if (answer === incorrectAnswer && incorrectAnswer === option) {
        return 'right'
      } else if (answer !== incorrectAnswer && incorrectAnswer === option) {
        return 'correct'
      } else {
        return ''
      }
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
    margin-bottom: 50px;
  }
  .incorrect-answer-gray-box-title {
    text-align: center;
  }
  /* 题目 */
  .subject-title {
    color: #333333;
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 10px;
    padding-left: 20px;
    position: relative;
    .subject-title-number {
      position: absolute;
      left: -25px;
      top: 0;
      display: inline-block;
      width: 40px;
      line-height: 22px;
      text-align: right;
    }
  }
  /* 题目选项 */
  .subject-option {
    padding-bottom: 10px;
    padding-left: 10px;
  }
  .score {
    margin: 20px;
  }
  .subject-content {
    background: #F6F7FA;
    border-radius: 4px;
    margin-bottom: 21px;
    padding: 12px 0 12px 22px;
    position: relative;
    min-height: 240px;
    color: #666666;
    text-align: left;
  }
  .correct {
    color: #F56C6C;
  }
  .right {
    color: #67C23A;
  }
</style>
