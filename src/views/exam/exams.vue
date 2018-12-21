<template>
  <div>
    <el-row class="exam-msg">
      <el-col :span="24" style="color: black;">
        <h1>所有考试</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" v-for="(exam, index) in examList" :key="exam" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../../static/images/home/icon_scenes4.jpg" class="image">
          <div style="padding: 14px;">
            <span>{{ exam.examinationName }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { fetchList } from '@/api/exam/exam'
export default {
  data () {
    return {
      examList: []
    }
  },
  created () {
    this.getExamList()
  },
  methods: {
    // 加载考试列表
    getExamList () {
      fetchList().then(response => {
        this.examList = response.data.list
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .exam-msg {
    @extend %message-common;
  }
</style>
