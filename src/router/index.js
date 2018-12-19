import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Home from '@/views/home/home'
import Functions from '@/views/functions/functions'
import Us from '@/views/us/us'
import Login from '@/views/login/login'
import Register from '@/views/register/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/home',
      children: [
        {path: 'home', component: Home}
      ]
    },
    {path: '/functions', name: 'functions', component: Functions},
    {path: '/us', name: 'us', component: Us},
    {path: '/login', name: 'login', component: Login},
    {path: '/register', name: 'register', component: Register},
    {path: '*', redirect: '/home'}
  ]
})
