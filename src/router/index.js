import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/home')
      },
      {
        path: '/functions',
        name: 'functions',
        component: () => import('@/views/function/function')
      },
      {
        path: '/us',
        name: 'us',
        component: () => import('@/views/us/us')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/login/login')
      },
      {
        path: '/courses',
        name: 'courses',
        component: () => import('@/views/exam/courses')
      },
      {
        path: '/exams',
        name: 'exams',
        component: () => import('@/views/exam/exams')
      },
      {
        path: '/start',
        name: 'start',
        component: () => import('@/views/exam/startExam')
      },
      {
        path: '/score',
        name: 'score',
        component: () => import('@/views/exam/score')
      },
      {
        path: '/incorrect-answer',
        name: 'incorrect-answer',
        component: () => import('@/views/exam/incorrectAnswer')
      }
    ]
  },
  {
    path: '*',
    redirect: '/home'
  }
]
export default new Router({
  routes: constantRouterMap
})
