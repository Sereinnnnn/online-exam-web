<template>
  <div>
    <el-row class="practice-msg">
      <el-col :span="24" style="color: black;">
        <h1>在线学习</h1>
      </el-col>
    </el-row>
    <div class="courses" v-loading="listLoading">
      <el-row v-for="practice in practices" :key="practice.id">
        <el-col :offset="8">
          <div class="practice">
            <a href="javascript:void(0);" class="practice-title">
              <img :src="getAvatar(practice.avatar)" v-if="practice.avatar !== undefined && practice.avatar !== null && practice.avatar !== ''" class="practice-image">
              <img src="../../../static/images/practices/practice.png" v-else class="practice-image">
              <p>
                <span class="practice-name">{{practice.examinationName}}</span>
              </p>
            </a>
            <div style="padding: 14px;" class="practice-right">
              <h4>
                <label>{{practice.examinationName}}<span>客观题练习</span></label>
              </h4>
              <p>{{ practice.remark }}</p>
              <div class="practice-details">
                <label><span>{{practice.peoples}}</span>5人在学习</label>
              </div>
              <el-button type="success">开始练习</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-col v-if="!listLoading && practices.length === 0" :span="24">
        <p class="exam-empty">暂无更多数据</p>
      </el-col>
    </div>
  </div>
</template>
<script>
import { fetchList } from '@/api/exam/exam'
import { ATTACHMENT_URL } from '@/config/attachment'

export default {
  data () {
    return {
      listLoading: true,
      practices: [],
      listQuery: {
        type: '2'
      }
    }
  },
  created () {
    this.getPractices()
  },
  methods: {
    // 加载课程列表
    getPractices () {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.practices = response.data.list
        this.listLoading = false
      })
    },
    // 加载考试类表
    getExamList (practice) {
      this.$router.push({name: 'exams', query: {practiceId: practice.id}})
    },
    getAvatar (attachmentId) {
      return ATTACHMENT_URL + '/download?id=' + attachmentId
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/common.scss";
  .practice-msg {
    @extend %message-common;
  }
  .practice {
    margin-top: 50px;
    padding-bottom: 50px;
    .practice-title {
      float: left;
      position: relative;
      .practice-name {
        border-bottom: 2px solid #fff;
      }
      span {
        display: block;
        line-height: 53px;
      }
    }
    .practice-right {
      margin-left: 470px;
    }
    .practice-right p {
      font-size: 14px;
      color: #848484;
      line-height: 24px;
      margin: 28px 0;
      min-height: 70px;
    }
    .practice-details label {
      font-size: 14px;
      color: #17b7f2;
      margin-right: 50px;
    }
    .practice-image {
      width: 420px;
      height: 267px;
      display: block;
      cursor: pointer;
    }
  }
  .exam-empty {
    text-align: center;
  }
</style>
