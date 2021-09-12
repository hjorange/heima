import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Layout from '../views/Layout'
import Home from '../views/Home'
import Video from '../views/Video'
import Qa from '../views/Qa'
import Profile from '../views/Profile'
import Search from '../views/Search'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: '/video',
        component: Video
      },
      {
        path: '/qa',
        component: Qa
      },
      {
        path: '/profile',
        component: Profile
      }
    ]
  },
  {
    path: '/search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
