<template>
  <div>
    <el-row class="course-msg">
      <el-col :span="24" style="color: black;">
        <h1>所有课程</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" v-for="(course, index) in courseList" :key="course" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../../static/images/home/icon_scenes4.jpg" class="image">
          <div style="padding: 14px;">
            <span>{{ course.courseName }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { courseList } from '@/api/exam/course'
export default {
  data () {
    return {
      courseList: []
    }
  },
  created () {
    this.getCourseList()
  },
  methods: {
    // 加载课程列表
    getCourseList () {
      courseList().then(response => {
        this.courseList = response.data.list
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .course-msg {
    @extend %message-common;
  }
</style>
