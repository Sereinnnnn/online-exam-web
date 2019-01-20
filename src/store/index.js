import Vue from 'vue'
import Vuex from 'vuex'

// 用户模块
import user from './modules/user'

// 考试模块
import exam from './modules/exam'

// getters
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    exam
  },
  getters
})

export default store
