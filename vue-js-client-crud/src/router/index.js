import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: 'Home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/Memo',
    name: 'Memo',
    component: () => import('@/views/Memo.vue')
  },
  {
    path: '/Poject',
    name: 'Project',
    component: () => import('@/views/Project.vue')
  },
  {
    path: '/Calendar',
    name: 'Calendar',
    component: () => import('@/views/Calendar.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
