<template>
  <div>
    <el-row class="exam-msg">
      <el-col :span="24" style="color: black;">
        <h1>所有考试</h1>
      </el-col>
    </el-row>
    <el-row :gutter="100">
      <el-col :span="6" v-for="(exam, index) in examList" :key="exam.id" :offset="(index === 0 || index % 3 === 0) ? 2 : 0">
        <el-card :body-style="{ padding: '12px' }">
          <img src="../../../static/images/home/icon_function3.jpg" class="exam-image">
          <div style="padding: 14px;">
            <span>{{ exam.examinationName }}</span>
            <div class="exam-bottom">
              <time class="exam-time">开始时间：{{ exam.startTime }}</time>
              <el-button type="text" class="exam-button" @click="startExam(exam)">开始考试</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col v-if="examList.length === 0" :span="24">
        <p class="exam-empty">暂无更多数据</p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { fetchList } from '@/api/exam/exam'
export default {
  data () {
    return {
      examList: [],
      query: {
        courseId: '',
        status: '0'
      }
    }
  },
  created () {
    let courseId = this.$route.query.courseId
    if (courseId !== undefined && courseId !== null) {
      this.query.courseId = courseId
    }
    // 加载考试列表
    this.getExamList()
  },
  methods: {
    // 加载考试列表
    getExamList () {
      fetchList(this.query).then(response => {
        this.examList = response.data.list
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '查看考试失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    // 开始考试
    startExam (exam) {
      this.$notify({
        title: '注意',
        message: '即将考试：' + exam.examinationName,
        type: 'warn',
        duration: 2000
      })
      this.$router.push({name: 'start', query: {examinationId: exam.id}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/common.scss";
  .exam-msg {
    @extend %message-common;
  }
  .exam-image {
    width: 100%;
    display: block;
    cursor: pointer;
  }
  .el-col {
    margin-bottom: 40px;
  }
  .exam-bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .exam-button {
    padding: 0;
    float: right;
  }
  .exam-time {
    font-size: 13px;
    color: #999;
  }
  .exam-empty {
    font-size: 13px;
    color: #999;
    text-align: center;
  }
</style>
