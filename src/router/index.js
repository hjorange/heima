import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Layout from '../views/Layout'
import Home from '../views/Home'
import Video from '../views/Video'
import Qa from '../views/Qa'
import Profile from '../views/Profile'
import Search from '../views/Search'
import Article from '@/views/ArticleIT'

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
    path: '/article/:articleId',
    component: Article,
    props: true // 开启路由传参
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
