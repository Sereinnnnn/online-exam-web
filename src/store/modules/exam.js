import { getObj } from '@/api/exam/exam'
import { addObj } from '@/api/exam/examRecord'
import {setStore, getStore} from '@/utils/store'
import { submit } from '@/api/exam/answer'
import user from "./user";

const exam = {
  state: {
    exam: getStore({
      name: 'exam'
    }) || {},
    examRecord: getStore({
      name: 'examRecord'
    }) || {}
  },
  actions: {
    GetExamInfo ({ commit, state }, exam) {
      return new Promise((resolve, reject) => {
        getObj(exam.id, {timeFormat: true}).then(response => {
          const data = response.data.data
          commit('SET_EXAM', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新增考试记录
    AddExamRecordInfo ({ commit, state }, examRecord) {
      return new Promise((resolve, reject) => {
        addObj(examRecord).then(response => {
          const data = response.data.data
          commit('SET_EXAM_RECORD', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 提交考试
    SubmitExam ({ commit, state }, exam) {
      return new Promise((resolve, reject) => {
        submit(exam).then(response => {
          // 清空考试记录和考试信息
          commit('SET_EXAM_RECORD', '')
          commit('SET_EXAM', '')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  mutations: {
    SET_EXAM: (state, exam) => {
      state.exam = exam
      setStore({
        name: 'exam',
        content: state.exam,
        type: 'session'
      })
    },
    SET_EXAM_RECORD: (state, examRecord) => {
      state.examRecord = examRecord
      setStore({
        name: 'examRecord',
        content: state.examRecord,
        type: 'session'
      })
    }
  }
}

export default exam
