<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="18" :offset="2">
        <el-card class="subject-box-card" v-loading="loading">
          <div class="subject-exam-title" v-if="!loading && tempSubject.id !== ''">{{exam.examinationName}}（共{{subjectList.length + 1}}题，合计{{exam.totalScore}}分）</div>
          <div class="subject-content" v-if="!loading && tempSubject.id !== ''">
            <div class="subject-title">
              <span class="subject-title-number">{{subjectIndex}} .</span>
              {{tempSubject.subjectName}}（{{tempSubject.score}}分）
            </div>
            <div class="subject-option">
              <el-radio v-model="option" label="A">A. {{tempSubject.optionA}}</el-radio>
            </div>
            <div class="subject-option">
              <el-radio v-model="option" label="B">B. {{tempSubject.optionB}}</el-radio>
            </div>
            <div class="subject-option">
              <el-radio v-model="option" label="C">C. {{tempSubject.optionC}}</el-radio>
            </div>
            <div class="subject-option">
              <el-radio v-model="option" label="D">D. {{tempSubject.optionD}}</el-radio>
            </div>
          </div>
          <div class="subject-buttons" v-if="!loading && tempSubject.id !== ''">
            <el-button plain @click="last">上一题</el-button>
            <el-button v-if="subjectIndex !== subjectList.length" plain @click="next">下一题</el-button>
            <el-button v-if="subjectIndex !== 0 && subjectIndex === subjectList.length" type="success" @click="submit" v-bind:disabled="disableSubmit">提交</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="2">
        <div class="time-remain">
          剩余时间:
          <div class="time">
            <count-down v-on:start_callback="countDownS_cb(1)" v-on:end_callback="countDownE_cb(1)" :current-time="currentTime" :start-time="startTime" :end-time="endTime" :tip-text="'距离考试开始'" :tip-text-end="'距离考试结束'" :end-text="'考试结束'" :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''">
            </count-down>
          </div>
        </div>
        <div class="current-progress">
          当前进度: {{subjectIndex}}/{{subjectList.length}}
        </div>
        <div class="answer-card">
          <el-button type="text" icon="el-icon-date" @click="answerCard">答题卡</el-button>
        </div>
        <el-button type="success" icon="el-icon-date" @click="submit" v-bind:disabled="disableSubmit">提交</el-button>
      </el-col>
    </el-row>
    <el-dialog title="答题卡" :visible.sync="dialogVisible" width="50%" top="10vh" center>
      <div class="answer-card-title" >{{exam.examinationName}}（共{{subjectList.length + 1}}题，合计{{exam.totalScore}}分）</div>
      <div class="answer-card-split"></div>
      <el-row class="answer-card-content">
        <el-button circle v-for="(subject, index) in subjectList" :key="subject.id" @click="toSubject(subject, index + 1)">&nbsp;{{index + 1}}&nbsp;</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CountDown from 'vue2-countdown'
import { getObj } from '@/api/exam/exam'
import { fetchSubjectList } from '@/api/exam/subject'
import { saveOrUpdate, fetchAnswerList, submit } from '@/api/exam/answer'
import { addObj } from '@/api/exam/examRecord'
export default {
  components: {
    CountDown
  },
  data () {
    return {
      loading: true,
      subjectList: [],
      subjectIndex: 1,
      currentTime: 0,
      startTime: 0,
      endTime: 0,
      disableSubmit: true,
      tempSubject: {
        id: '',
        examinationId: '',
        subjectName: '',
        type: 0,
        content: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        optionE: '',
        optionF: '',
        answer: '',
        score: '',
        analysis: '',
        level: 2
      },
      exam: {
        id: '',
        examinationName: '',
        type: 0,
        attention: '',
        startTime: '',
        endTime: '',
        duration: '',
        totalScore: '',
        status: 0,
        avatar: '',
        collegeId: '',
        majorId: '',
        course: {
          id: '',
          courseName: ''
        },
        remark: ''
      },
      query: {
        examinationId: ''
      },
      option: '',
      dialogVisible: false,
      tempAnswer: {
        id: '',
        userId: '',
        examinationId: '',
        courseId: '',
        subjectId: '',
        answer: ''
      },
      tempExamRecord: {
        id: '',
        userId: '',
        examinationId: ''
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
    let examinationId = this.$route.query.examinationId
    if (examinationId !== undefined && examinationId !== null) {
      this.query.examinationId = examinationId
      this.tempExamRecord.examinationId = examinationId
      this.tempExamRecord.userId = this.userInfo.id
    }
    // 开始考试
    this.startExam(this.query.examinationId)
  },
  methods: {
    countDownS_cb: function (x) {
      this.$notify({
        title: '提示',
        message: '考试开始',
        type: 'warn',
        duration: 2000
      })
    },
    // 开始考试
    startExam (examinationId) {
      this.$confirm('确定要开始吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 创建考试记录
        addObj(this.tempExamRecord).then(response => {
          this.tempExamRecord = response.data.data
          // 加载考试信息
          this.getExamInfo(examinationId)
        })
      }).catch(() => {
        this.$router.push({name: 'exams'})
      })
    },
    // 考试结束
    countDownE_cb: function (x) {
      this.$notify({
        title: '提示',
        message: '考试结束',
        type: 'warn',
        duration: 2000
      })
      this.disableSubmit = true
      this.loading = false
    },
    // 加载考试信息
    getExamInfo (examinationId) {
      getObj(examinationId, {timeFormat: true}).then(response => {
        this.exam = response.data.data
        // 获取服务器的当前时间
        this.currentTime = parseInt(this.exam.currentTime)
        // 考试开始时间
        this.startTime = parseInt(this.exam.startTime)
        // 考试已经考试
        if (this.startTime < this.currentTime) {
          this.startTime = this.currentTime
          // 开启提交按钮
          this.disableSubmit = false
        } else {
          this.$notify({
            title: '提示',
            message: '考试未开始',
            type: 'warn',
            duration: 2000
          })
        }
        // 考试结束时间
        this.endTime = parseInt(this.exam.endTime)
        // 加载题目信息
        this.getSubjectList(this.query)
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '加载考试失败',
          type: 'error',
          duration: 2000
        })
        this.loading = false
      })
    },
    // 加载题目
    getSubjectList (query) {
      fetchSubjectList(query).then(response => {
        this.subjectList = response.data.list
        this.tempSubject = this.getSubjectBySerialNumber(this.subjectIndex)
        // 加载答题
        let query = {
          userId: this.userInfo.id,
          examinationId: this.exam.id,
          examRecordId: this.tempExamRecord.id,
          courseId: '',
          subjectId: this.tempSubject.id
        }
        this.getAnswerList(query)
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '加载题目失败',
          type: 'error',
          duration: 2000
        })
        this.loading = false
      })
    },
    // 加载答题
    getAnswerList (query) {
      fetchAnswerList(query).then(response => {
        let list = response.data.list
        if (list.length > 0) {
          this.tempAnswer = list[0]
          this.option = this.tempAnswer.answer
        } else {
          // 没找到
          this.resetTempAnswer()
        }
        this.loading = false
      })
    },
    // 上一题
    last () {
      if (this.subjectIndex === 1) {
        this.$notify({
          title: '提示',
          message: '已经是第一题了',
          type: 'warn',
          duration: 2000
        })
        return
      }
      this.loading = true
      // 先回退题目
      this.subjectIndex--
      this.tempSubject = this.getSubjectBySerialNumber(this.subjectIndex)
      // 查找答题
      let query = {
        userId: this.userInfo.id,
        examinationId: this.exam.id,
        examRecordId: this.tempExamRecord.id,
        courseId: '',
        subjectId: this.tempSubject.id
      }
      this.getAnswerList(query)
      this.loading = false
    },
    // 下一题
    next () {
      if (this.subjectIndex === this.subjectList.length) {
        this.$notify({
          title: '提示',
          message: '已经是最后一题了',
          type: 'warn',
          duration: 2000
        })
        return
      }
      this.loading = true
      // 提交到后台
      let answer = {
        id: this.tempAnswer.id,
        userId: this.userInfo.id,
        examinationId: this.exam.id,
        examRecordId: this.tempExamRecord.id,
        subjectId: this.tempSubject.id,
        answer: this.option
      }
      saveOrUpdate(answer).then(response => {
        console.log('提交成功')
      }).catch(() => {
        console.log('提交失败')
      })
      this.option = ''
      this.subjectIndex++
      this.tempSubject = this.getSubjectBySerialNumber(this.subjectIndex)
      // 加载答题
      let query = {
        userId: this.userInfo.id,
        examinationId: this.exam.id,
        examRecordId: this.tempExamRecord.id,
        courseId: '',
        subjectId: this.tempSubject.id
      }
      this.getAnswerList(query)
      this.loading = false
    },
    // 根据序号查询题目
    getSubjectBySerialNumber (serialNumber) {
      for (let i = 0; i < this.subjectList.length; i++) {
        if (parseInt(this.subjectList[i].serialNumber) === serialNumber) {
          return this.subjectList[i]
        }
      }
    },
    // 答题卡
    answerCard () {
      this.dialogVisible = true
    },
    // 跳转题目
    toSubject (subject, index) {
      this.tempSubject = subject
      this.subjectIndex = index
      this.dialogVisible = false
    },
    // 提交
    submit () {
      this.$confirm('确定要提交吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 提交到后台
        let answer = {
          id: this.tempAnswer.id,
          userId: this.userInfo.id,
          examinationId: this.exam.id,
          examRecordId: this.tempExamRecord.id,
          subjectId: this.tempSubject.id,
          answer: this.option
        }
        saveOrUpdate(answer).then(response => {
          this.submitExam(answer)
          // 禁用提交按钮
          this.disableSubmit = true
        }).catch(() => {
          this.$notify({
            title: '提示',
            message: '提交失败',
            type: 'error',
            duration: 2000
          })
        })
      })
    },
    // 提交考试
    submitExam (answer) {
      submit({ examinationId: answer.examinationId, examRecordId: this.tempExamRecord.id, userId: answer.userId }).then(response => {
        this.$notify({
          title: '提示',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push({name: 'score', query: { examinationId: answer.examinationId, examRecordId: this.tempExamRecord.id, userId: answer.userId }})
      }).catch(() => {
        this.$notify({
          title: '提示',
          message: '提交失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    // 重置
    resetTempAnswer () {
      this.tempAnswer = {
        id: '',
        userId: '',
        examinationId: '',
        examRecordId: this.tempExamRecord.id,
        courseId: '',
        subjectId: '',
        answer: ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/common.scss";
  .start-exam-msg {
    @extend %message-common;
  }
  .subject-box-card {
    margin-bottom: 30px;
    min-height: 400px;
    .subject-exam-title{
      font-size: 18px;
      line-height: 25px;
      padding: 18px 20px;
      border-bottom: 1px solid #DEDEDE;
    }
    .subject {
      padding-left: 30px;
      padding-right: 75px;
    }
    .subject-content{
      padding: 30px 0;
      position: relative;
    }
    /* 题目 */
    .subject-title {
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
      padding: 10px 15px 10px 45px;
    }
  }
  .subject-buttons {
    text-align: center;
  }
  .time-remain .time {
    font-size: 18px;
    line-height: 22px;
    color: #FF0000;
    font-weight: 400;
  }

  /* 答题卡 */
  .answer-card-title {
    font-size: 13px;
    color: #3A3E51;
    line-height: 17px;
    padding: 10px 0;
  }
  .answer-card-split {
    width: 100%;
    border-bottom: 1px solid #E6E6E6;
  }
  .answer-card-content {
    padding-bottom: 10px;
    font-size: 0;
    margin-right: -15px;
    > button {
      margin-top: 5px;
    }
  }
</style>
