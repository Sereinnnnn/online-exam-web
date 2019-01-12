<template>
  <div>
    <el-row class="course-msg">
      <el-col :span="24" style="color: black;">
        <h1>所有课程</h1>
      </el-col>
    </el-row>
    <el-row :gutter="100" v-loading="listLoading">
      <el-col :span="6" v-for="(course, index) in courseList" :key="course.id" :offset="(index === 0 || index % 3 === 0) ? 2 : 0">
        <el-card :body-style="{ padding: '12px' }">
          <img src="../../../static/images/home/icon_function1.jpg" class="course-image">
          <div style="padding: 14px;">
            <span>{{ course.courseName }}</span>
            <div class="course-bottom">
              <time class="course-time">{{ course.createDate }}</time>
              <el-button type="text" class="course-button" @click="getExamList(course)">查看考试</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col v-if="!listLoading && courseList.length === 0" :span="24">
        <p class="exam-empty">暂无更多数据</p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { courseList } from '@/api/exam/course'
export default {
  data () {
    return {
      listLoading: true,
      courseList: []
    }
  },
  created () {
    this.getCourseList()
  },
  methods: {
    // 加载课程列表
    getCourseList () {
      this.listLoading = true
      courseList().then(response => {
        this.courseList = response.data.list
        this.listLoading = false
      })
    },
    // 加载考试类表
    getExamList (course) {
      this.$router.push({name: 'exams', query: {courseId: course.id}})
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
  .course-image {
    width: 100%;
    display: block;
    cursor: pointer;
  }
  .el-col {
    margin-bottom: 40px;
  }
  .course-bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .course-button {
    padding: 0;
    float: right;
  }
  .course-time {
    font-size: 13px;
    color: #999;
  }
</style>
