import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
// import Cookies from 'js-cookie'
// import Session from ''

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: 'Home',
    name: 'Home',
    meta: {requireAuth: true},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/Memo',
    name: 'Memo',
    meta: {requireAuth: true},
    component: () => import('@/views/Memo.vue')
  },
  {
    path: '/Project',
    name: 'Project',
    meta: {requireAuth: true},
    component: () => import('@/views/Project.vue')
  },
  {
    path: '/Calendar',
    name: 'Calendar',
    meta: {requireAuth: true},
    component: () => import('@/views/Calendar.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {requireAuth: false},
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    meta: {requireAuth: false},
    component: () => import('@/views/Login.vue')
  },
  // {
  //   path: '*',
  //   redirect: '/'
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async(to, from, next) => {
  console.log('to: ', to)
  console.log('from: ', from)
  
  if (to.meta.requireAuth) {
    // // 獲取Cookies當中的login資訊並取得token
    // const info = Cookies.get('login')
    // const token = JSON.parse(info).token
    // // console.log(token)
    // if (info) {
    //   // 如果token不為空，且確實有這個欄位則讓路由變更
    //   if (token.length > 0 || token === undefined) {
    //     next()
    //   } else {
    //     // 未通過則導回login頁面
    //     next({ name: 'Login' })
    //     console.log('next: ',next)
    //   }
    // } else {
    //   console.log('!')
    //   next({ name: 'Login' })
    // }
    if(store.state.username){
      next()
    } else {
      next({ name: 'Login'})
    }
  } else {
    next()
  }
})

export default router
