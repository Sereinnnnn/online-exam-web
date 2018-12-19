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
        component: () => import('@/views/home/home')
      }
    ]
  },
  {
    path: '/function',
    name: 'function',
    component: () => import('@/views/Index'),
    redirect: '/functions',
    children: [
      {
        path: 'functions',
        component: () => import('@/views/function/function')
      }
    ]
  },
  {
    path: '/us',
    name: 'us',
    component: () => import('@/views/Index'),
    redirect: '/uss',
    children: [
      {
        path: 'uss',
        component: () => import('@/views/us/us')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/register')
  },
  {
    path: '*',
    redirect: '/home'
  }
]
export default new Router({
  routes: constantRouterMap
})
